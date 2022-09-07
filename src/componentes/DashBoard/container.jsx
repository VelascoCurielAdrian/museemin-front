import { useState } from 'react';
import { Box } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { Appbar } from './appbar';
import { Drawer } from './drawer';
import { Paper } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export const DashBoard = ({ children }) => {
	const [open, setOpen] = useState(false);

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
			<Box
				component='main'
				sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', height: '100vh' }}
			>
				<DrawerHeader />
				<Paper sx={{ flexGrow: 1, p: 2,  minHeight:'85vh'}}>
					{children}
				</Paper>
			</Box>
		</Box>
	);
};
