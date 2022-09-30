import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {
	DataGrid,
	gridPageCountSelector,
	gridPageSelector,
	useGridApiContext,
	useGridSelector,
} from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { CgBrowse } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';
import Pagination from '@mui/material/Pagination';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import PaginationItem from '@mui/material/PaginationItem';

import { parseError } from '../../helpers';
import { Header } from '../Header/cointainer';
import { Confirmation } from '../confirmation/component';

function CustomPagination() {
	const apiRef = useGridApiContext();
	const page = useGridSelector(apiRef, gridPageSelector);
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);

	return (
		<Pagination
			color="primary"
			variant="outlined"
			shape="rounded"
			page={page + 1}
			count={pageCount}
			renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
			onChange={(event, value) => apiRef.current.setPage(value - 1)}
		/>
	);
}

export const Table = ({
	title,
	subtitle,
	uri,
	handleNew,
	columns,
	height,
	showActions,
	urlDelete,
	dataCache,
}) => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const [deleteRow, setDeleteRow] = useState({});
	const [filtros, setFiltros] = useState({ txtBusqueda: '' });

	const open = Boolean(anchorEl);

	const [_delete, { loading: loadingDelete }] = useMutation(urlDelete.gql, {
		update(cache) {
			cache.evict({ fieldName: [dataCache] });
			cache.gc();
		},
		onCompleted: (response) => {
			toast.success(Object.values(response)[0].mensaje);
		},
		onError: (e) => {
			const parseErrors = parseError(e);
			parseErrors.forEach(({ message, name }) => {
				if (name === 'BAD_USER_INPUT') {
					toast.error(`${Object.values(message)}`);
				}
			});
		},
	});

	const [getRegistros, { data, loading, error }] = useLazyQuery(uri, {
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first',
	});

	useEffect(() => {
		getRegistros({
			variables: {
				offset: null,
				limit: null,
				...filtros,
			},
		});
	}, [filtros]);

	const handleClose = () => {
		setAnchorEl(null);
	};
	const showConfirm = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleDelete = async () => {
		await _delete({ variables: deleteRow });
		setAnchorEl(null);
	};

	const handleEdit = (row) => {
		navigate(`/${row.__typename}/formulario/${row.id}`, {
			replace: true,
		});
	};

	const buscar = (txtBusqueda) => {
		setFiltros((current) => ({ ...current, txtBusqueda }));
	};

	const newColumns = [
		...columns,
		{
			field: 'actions',
			type: 'actions',
			headerName: 'ACCIONES',
			width: 100,
			getActions: ({ row, index }) => [
				<GridActionsCellItem
					onClick={() => handleEdit(row, index)}
					icon={<FiEdit size={15} />}
					label="Editar"
				/>,
				<GridActionsCellItem
					onClick={(e) => {
						showConfirm(e);
						setDeleteRow({ [urlDelete.params]: row.id });
					}}
					icon={<MdOutlineDelete size={15} />}
					label="Delete"
				/>,
			],
		},
	];

	return (
		<>
			<Header
				title={title}
				buscar={buscar}
				subtitle={subtitle}
				listado
				handleNew={handleNew}
			/>
			<Box
				sx={{
					height: height ? height : 480,
					width: '100%',
					'& .MuiDataGrid-columnHeaders': {
						outline: 'none',
						backgroundColor: '#E9EEFA',
						color: '#212121',
						fontSize: 13,
						fontWeight: 600,
					},
					'& .MuiDataGrid-iconSeparator': {
						display: 'none',
					},
					'& .MuiDataGrid-cell': {
						fontSize: 11,
						fontWeight: 400,
						backgroundColor: '#f5f5f5',
						color: '#212121',
					},
					'& .MuiDataGrid-cell:focus': {
						outline: 'none',
					},
				}}
			>
				<DataGrid
					error={error}
					loading={loading}
					columns={showActions ? newColumns : columns}
					rows={Object.values(data || [])[0]?.rows || []}
					pageSize={10}
					autoHeight
					components={{
						NoRowsOverlay: () => (
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									height: '100%',
									marginTop: 0.2,
									color: 'gray',
									fontSize: 14,
								}}
							>
								<CgBrowse size={50} />
								<Box
									sx={{
										mt: 1,
									}}
								>
									No hay registros
								</Box>
							</Box>
						),
						Pagination: CustomPagination,
					}}
					disableColumnMenu
					rowsPerPageOptions={[5]}
					disableSelectionOnClick
				/>
			</Box>
			<Confirmation
				open={open}
				loading={loadingDelete}
				anchorEl={anchorEl}
				handleClose={handleClose}
				handleDelete={handleDelete}
			/>
		</>
	);
};
