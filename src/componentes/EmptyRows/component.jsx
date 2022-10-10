import { Box } from '@mui/material';
import { CgBrowse } from 'react-icons/cg';

export const EmptyRows = () => (
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
);
