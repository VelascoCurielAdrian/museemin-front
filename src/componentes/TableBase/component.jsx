import { Fragment } from 'react';
import propTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

import { Container } from './styles';
import { CustomPagination } from '../Pagination/component';
import { EmptyRows } from '../EmptyRows/component';

export const TableBase = ({
	data,
	error,
	height,
	loading,
	columns,
	pageSize,
	showPaginate,
	headerHeight,
}) => {
	return (
		<Fragment>
			<Container height={height}>
				<DataGrid
					error={error}
					loading={loading}
					columns={columns}
					rows={data}
					pageSize={pageSize}
					autoHeight
					headerHeight={headerHeight}
					components={{
						NoRowsOverlay: EmptyRows,
						Pagination: showPaginate && CustomPagination,
					}}
					disableColumnMenu
					rowsPerPageOptions={[5]}
					disableSelectionOnClick
				/>
			</Container>
		</Fragment>
	);
};

TableBase.propTypes = {
	data: propTypes.array,
	error: propTypes.bool,
	loading: propTypes.bool,
	columns: propTypes.array,
	height: propTypes.number,
	pageSize: propTypes.number,
	newColumns: propTypes.array,
	headerHeight: propTypes.number,
};

TableBase.defaultProps = {
	title: '',
	subtitle: '',
	uri: {},
	columns: [],
	data: [],
	newColumns: [],
	pageSize: 10,
	showHeader: false,
	showPaginate: true,
	headerHeight: 50,
};
