import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ theme, height }) => ({
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
	'&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
		outline: 'none',
	},
	'& .MuiDataGrid-root': {
		'& .MuiDataGrid-colCell:focus': {
			outline: 'none',
		},
	},
}));
