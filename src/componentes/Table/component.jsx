import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { MdOutlineDelete, MdPrint } from 'react-icons/md';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';

import { parseError } from '../../helpers';
import { Header } from '../Header/component';
import { Confirmation } from '../confirmation/component';
import { searchField, snackbar } from '../../configuracion/apollo/cache';
import TableBase from '../TableBase';
const defaultSnackbar = { isOpen: true, time: 3000 };
export const Table = ({
	uri,
	pdf,
	title,
	print,
	height,
	filters,
	columns,
	subtitle,
	handleNew,
	urlDelete,
	dataCache,
	autoHeight,
	showHeader,
	showActions,
	showPaginate,
}) => {
	const txtBusqueda = useReactiveVar(searchField);
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const [deleteRow, setDeleteRow] = useState({});
	const open = Boolean(anchorEl);

	const [_delete, { loading: loadingDelete }] = useMutation(urlDelete.gql, {
		update(cache) {
			cache.evict({ fieldName: [dataCache] });
			cache.gc();
		},
		onCompleted: (response) => {
			searchField('');
			snackbar({
				...defaultSnackbar,
				label: Object.values(response)[0].mensaje,
				severity: 'success',
			});
			toast.success(Object.values(response)[0].mensaje);
		},
		onError: (e) => {
			const parseErrors = parseError(e);
			parseErrors.forEach(({ message, name }) => {
				if (name === 'BAD_USER_INPUT') {
					snackbar({
						...defaultSnackbar,
						label: Object.values(message),
						severity: 'error',
					});
				}
			});
		},
	});

	const { data, loading, error } = useQuery(uri, {
		variables: {
			offset: null,
			limit: null,
			txtBusqueda,
			...filters,
		},
	});

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

	const handlePdf = (row) => {
		pdf(row);
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
				<GridActionsCellItem
					disabled={!print}
					onClick={() => handlePdf(row, index)}
					icon={<MdPrint size={15} />}
					label="Imprimir"
				/>,
			],
		},
	];

	return (
		<>
			{showHeader && (
				<Header
					title={title}
					subtitle={subtitle}
					listado
					handleNew={handleNew}
				/>
			)}
			<TableBase
				error={error}
				height={height}
				loading={loading}
				autoHeight={autoHeight}
				showPaginate={showPaginate}
				columns={showActions ? newColumns : columns}
				data={Object.values(data || [])[0]?.rows || []}
			/>
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

Table.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	uri: PropTypes.object,
	showHeader: PropTypes.bool,
	handleNew: PropTypes.func,
	columns: PropTypes.array,
	rowsData: PropTypes.array,
	height: PropTypes.number,
	showActions: PropTypes.bool,
	dataFixed: PropTypes.bool,
	showPaginate: PropTypes.bool,
	autoHeight: PropTypes.bool,
	print: PropTypes.bool,
	urlDelete: PropTypes.object,
	dataCache: PropTypes.string,
	pdf: PropTypes.func,
};

Table.defaultProps = {
	title: '',
	subtitle: '',
	uri: {},
	func: () => {},
	showHeader: false,
	showPaginate: true,
	dataFixed: false,
	print: false,
};
