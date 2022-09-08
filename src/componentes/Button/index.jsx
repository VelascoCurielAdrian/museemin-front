import { LoadingButton } from '@mui/lab';
import propTypes from 'prop-types';
import { Box } from '@mui/material';
import stylesButton from './styles';
import clsx from 'clsx';

const Button = ({
	label,
	name,
	loading,
	classesCustom,
	onClick,
	border,
	isSubmit,
}) => {
	const classes = stylesButton();

	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<LoadingButton
				className={clsx(classes.boton, classesCustom.boton, { [classes.border]: border })}
				sx={stylesButton}
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

Button.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  icono: propTypes.element,
  estilo: propTypes.object,
  classesCustom: propTypes.shape({
    boton: propTypes.string,
    icono: propTypes.string,
    texto: propTypes.string,
  }),
  onClick: propTypes.func,
  border: propTypes.bool,
  isSubmit: propTypes.bool,
}

Button.defaultProps = {
  label: '',
  variant: 'contained',
  icono: null,
  classesCustom: {},
  onClick: null,
  border: false,
  isSubmit: false,
}

export default Button;
