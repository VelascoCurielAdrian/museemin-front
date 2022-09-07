import { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { Profile } from './profile';
const drawerWidth = 230;

const AppBarCustomized = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export const Appbar = ({ open, handleDrawerOpen }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const openProfile = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<AppBarCustomized position='fixed' open={open}>
			<Toolbar>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					onClick={handleDrawerOpen}
					edge='start'
					sx={{
						marginRight: 5,
						...(open && { display: 'none' }),
					}}
				>
					<AiOutlineMenuUnfold />
				</IconButton>
				<Typography variant='button' noWrap component='div' sx={{ flexGrow: 1 }}>
					Mantenimineto Industrial
				</Typography>
				<div>
					<IconButton
						onClick={handleClick}
						size='small'
						sx={{ ml: 2 }}
						aria-controls={openProfile ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={openProfile ? 'true' : undefined}
						className='bg-gray-100'
					>
						<FaUserCircle size={18} />
					</IconButton>
				</div>
			</Toolbar>
			<Profile
				open={openProfile}
				handleClose={handleClose}
				anchorEl={anchorEl}
			/>
		</AppBarCustomized>
	);
};
