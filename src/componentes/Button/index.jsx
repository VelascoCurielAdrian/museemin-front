import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

const ButtonCustomized = ({ label, name, onClick, isSubmit, loading }) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<LoadingButton
				name={name}
				loading={loading}
				onClick={onClick}
				type={isSubmit ? 'submit' : 'button'}
				fullWidth
				variant='contained'
			>
				{label}
			</LoadingButton>
		</Box>
	);
};

export default ButtonCustomized;
