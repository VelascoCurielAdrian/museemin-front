import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';
import DialogMui from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaRegWindowClose } from 'react-icons/fa';
import DialogTitleMui from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useMediaQuery, useTheme } from '@mui/material';

const DialogCustom = styled(DialogMui)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitleMui sx={{ m: 1, p: 2 }} {...other}>
			<label
				htmlFor="detalleGastos"
				className="block text-sm mb-2 w-6 font-bold text-primary"
			>
				{children}
			</label>
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<FaRegWindowClose size={30} />
				</IconButton>
			) : null}
		</DialogTitleMui>
	);
};

DialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

const Dialog = ({ onClose, open, title, children }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<>
			<DialogCustom
				fullWidth
				maxWidth="xl"
				sx={{ height: 'auto' }}
				fullScreen={fullScreen}
				TransitionComponent={Transition}
				onClose={onClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle id="title" onClose={onClose}>
					{title}
				</DialogTitle>
				<DialogContent dividers>{children}</DialogContent>
			</DialogCustom>
		</>
	);
};

Dialog.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
};

export default Dialog;
