import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { Appbar } from './appbar';
import { Drawer } from './drawer';
import paleta from '../../configuracion/paleta';
import { Box } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

const Main = styled(Box)(({ theme }) => ({
	paddingRight: theme.spacing(3),
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	backgroundColor: paleta.sidebar.backgroundColor,
	[theme.breakpoints.only('xs')]: {
		paddingRight: theme.spacing(2),
	},
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
			<Main>
				<DrawerHeader />
				{children}
			</Main>
		</Box>
	);
};
