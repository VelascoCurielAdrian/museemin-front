import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { Divider, IconButton } from '@mui/material';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { NavItems } from './navItems';

const drawerWidth = 240;
const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(7.5)} + 2px)`,
	},
});

const DrawerCustomized = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

export const Drawer = ({ open, handleDrawerClose }) => {
	return (
		<DrawerCustomized variant='permanent' open={open}>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					<AiOutlineMenuFold />
				</IconButton>
			</DrawerHeader>
			<Divider />
			<NavItems open={open} />
			<Divider />
			<NavItems open={open} />
		</DrawerCustomized>
	);
};
