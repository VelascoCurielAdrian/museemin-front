import { Box } from "@mui/system";
import {
	DataGrid,
	gridPageCountSelector,
	gridPageSelector,
	useGridApiContext,
	useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { NoRows } from "../../assets/noRows";

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

export const Table = ({ columns, rows, loading, error, height }) => {
	return (
		<>
			<Box
				sx={{
					height: height ? height : 400,
					width: "100%",
					"& .MuiDataGrid-columnHeaders": {
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
				}}
			>
				<DataGrid
					rows={rows}
					error={error}
					loading={loading}
					columns={columns}
					pageSize={5}
					components={{
						NoRowsOverlay: NoRows,
						Pagination: CustomPagination,
					}}
					disableColumnMenu
					rowsPerPageOptions={[5]}
					disableSelectionOnClick
				/>
			</Box>
		</>
	);
};
