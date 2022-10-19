import { useState } from 'react';
import propTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';

import { parseError } from '../../helpers';
import { Header } from '../Header/component';
import { Confirmation } from '../confirmation/component';
import { searchField } from '../../configuracion/apollo/cache';
import { TableBase } from '../TableBase/component';

export const Table = ({
	uri,
	title,
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
	title: propTypes.string,
	subtitle: propTypes.string,
	uri: propTypes.object,
	showHeader: propTypes.bool,
	handleNew: propTypes.func,
	columns: propTypes.array,
	rowsData: propTypes.array,
	height: propTypes.number,
	showActions: propTypes.bool,
	dataFixed: propTypes.bool,
	showPaginate: propTypes.bool,
	autoHeight: propTypes.bool,
	urlDelete: propTypes.object,
	dataCache: propTypes.string,
};

Table.defaultProps = {
	title: '',
	subtitle: '',
	uri: {},
	showHeader: false,
	showPaginate: true,
	dataFixed: false,
};
