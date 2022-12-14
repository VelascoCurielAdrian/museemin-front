import { Fragment, memo } from 'react';
import propTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

import { Container } from './styles';
import { CustomPagination } from '../Pagination/component';
import { EmptyRows } from '../EmptyRows/component';
import { LinearProgress } from '@mui/material';

const TableBase = ({
	data,
	error,
	height,
	loading,
	columns,
	pageSize,
	autoHeight,
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
					autoHeight={autoHeight}
					headerHeight={headerHeight}
					components={{
						LoadingOverlay: LinearProgress,
						NoRowsOverlay: EmptyRows,
						Pagination: showPaginate && CustomPagination,
					}}
					disableColumnMenu
					rowsPerPageOptions={[10]}
					disableSelectionOnClick
					disableColumnResize
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
	autoHeight: false,
	showHeader: false,
	showPaginate: true,
	headerHeight: 50,
};

export default memo(TableBase);
