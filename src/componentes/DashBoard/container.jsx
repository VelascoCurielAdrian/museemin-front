import { useState } from 'react';
import { Box } from '@mui/system';
// import { gql, useQuery } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { Appbar } from './appbar';
import { Drawer } from './drawer';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

// export const USER_QUERY = gql`
// 	query getUsuarioAuth {
// 		getUsuarioAuth {
// 			usuario
// 			nombre
// 			correo
// 		}
// 	}
// `;

export const DashBoard = ({ children }) => {
	const [open, setOpen] = useState(false);
	// const { data, loading, error } = useQuery(USER_QUERY);
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Appbar open={open} handleDrawerOpen={handleDrawerOpen} />
			<Drawer open={open} handleDrawerClose={handleDrawerClose} />
			<Box component='main' sx={{ flexGrow: 1, paddingRight: 3, height: '100vh' }}>
				<DrawerHeader />
				{children}
			</Box>
		</Box>
	);
};
