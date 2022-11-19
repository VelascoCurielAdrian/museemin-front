import React from 'react';

import { useQuery, gql } from '@apollo/client';

import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { snackbar } from '../../configuracion/apollo/cache';

const GET_LOCAL = gql`
	query Snackbar {
		snackbar @client
	}
`;

const Alert = React.forwardRef((props, ref) => (
	<MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const Snackbar = () => {
	const { data } = useQuery(GET_LOCAL);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') return;
		snackbar({ isOpen: false, time: 3000, label: '', severity: 'success' });
	};

	return (
		<MuiSnackbar
			open={data.snackbar.isOpen}
			autoHideDuration={data.snackbar.time || null}
			anchorOrigin={{
				vertical: data.snackbar.vertical || 'top',
				horizontal: data.snackbar.horizontal || 'center',
			}}
			onClose={handleClose}
		>
			<Alert
				onClose={handleClose}
				severity={
					data && data.snackbar && data.snackbar.severity
						? data.snackbar.severity
						: 'success'
				}
			>
				{data.snackbar.label}
			</Alert>
		</MuiSnackbar>
	);
};

export default Snackbar;
