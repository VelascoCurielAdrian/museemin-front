import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useContext } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { FcSettings } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../configuracion/auth/context';
export const Profile = ({ anchorEl, open, handleClose }) => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const onLogout = () => {
		logout();
		navigate('/login', {
			replace: true,
		});
	};

	return (
		<Menu
			anchorEl={anchorEl}
			id='account-menu'
			open={open}
			onClose={handleClose}
			onClick={handleClose}
			PaperProps={{
				elevation: 0,
				sx: {
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1.5,
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1,
					},
					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 0,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: 'background.paper',
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0,
					},
				},
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
		>
			<MenuItem>
				<ListItemIcon>
					<FcSettings />
				</ListItemIcon>
				Configuración
			</MenuItem>
			<Divider />
			<MenuItem onClick={onLogout}>
				<ListItemIcon>
					<BiLogIn />
				</ListItemIcon>
				Cerrar Sessión
			</MenuItem>
		</Menu>
	);
};
