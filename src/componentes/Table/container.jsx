import { useState } from "react";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import {
	DataGrid,
	gridPageCountSelector,
	gridPageSelector,
	useGridApiContext,
	useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { NoRows } from "../../assets/noRows";
import { Confirmation } from "../confirmation/component";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { parseError } from "../../helpers";

function CustomPagination() {
	const apiRef = useGridApiContext();
	const page = useGridSelector(apiRef, gridPageSelector);
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);

	return (
		<Pagination
			color='primary'
			variant='outlined'
			shape='rounded'
			page={page + 1}
			count={pageCount}
			renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
			onChange={(event, value) => apiRef.current.setPage(value - 1)}
		/>
	);
}

export const Table = ({
	uri,
	columns,
	height,
	showActions,
	urlDelete,
	dataCache,
}) => {
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
			toast.success(Object.values(response)[0].mensaje);
		},
		onError: (e) => {
			const parseErrors = parseError(e);
			parseErrors.forEach(({ message, name }) => {
				if (name === "BAD_USER_INPUT") {
					toast.error(`${Object.values(message)}`);
				}
			});
		},
	});
	const { data, loading, error } = useQuery(uri, {
		variables: {
			offset: null,
			limit: null,
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
			field: "actions",
			type: "actions",
			headerName: "ACCIONES",
			width: 100,
			getActions: ({ row, index }) => [
				<GridActionsCellItem
					onClick={() => handleEdit(row, index)}
					icon={<FiEdit size={15} />}
					label='Editar'
				/>,
				<GridActionsCellItem
					onClick={(e) => {
						showConfirm(e);
						setDeleteRow({ [urlDelete.params]: row.id });
					}}
					icon={<MdOutlineDelete size={15} />}
					label='Delete'
				/>,
			],
		},
	];

	return (
		<>
			<Box
				sx={{
					height: height ? height : 480,
					width: "100%",
					"& .MuiDataGrid-columnHeaders": {
						outline: "none",
						backgroundColor: "#E9EEFA",
						color: "#212121",
						fontSize: 13,
						fontWeight: 600,
					},
					"& .MuiDataGrid-iconSeparator": {
						display: "none",
					},
					"& .MuiDataGrid-cell": {
						fontSize: 11,
						fontWeight: 400,
						backgroundColor: "#f5f5f5",
						color: "#212121",
					},
					"& .MuiDataGrid-cell:focus": {
						outline: "none",
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
						NoRowsOverlay: NoRows,
						Pagination: CustomPagination,
					}}
					disableColumnMenu
					GridLinesVisibility='None'
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
