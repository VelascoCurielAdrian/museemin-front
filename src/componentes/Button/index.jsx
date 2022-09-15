import { LoadingButton } from "@mui/lab";
import propTypes from "prop-types";
import { Box, Button } from "@mui/material";
import stylesButton from "./styles";
import clsx from "clsx";

const ButtonCustomized = ({
	label,
	size,
	icono,
	loading,
	classesCustom,
	onClick,
	border,
	isSubmit,
	fullWidth,
	className,
  showLoading,
}) => {
	const classes = stylesButton();

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			{showLoading ? (
				<LoadingButton
					className={clsx(classes.boton, classesCustom.boton, {
						[classes.border]: border,
					})}
					startIcon={icono}
					sx={stylesButton}
					loading={loading}
					onClick={onClick}
					type={isSubmit ? "submit" : "button"}
					fullWidth={fullWidth}
					variant='contained'
				>
					{label}
				</LoadingButton>
			) : (
				<Button
					sx={stylesButton}
					size={size}
					className={className}
					startIcon={icono}
					onClick={onClick}
					type={isSubmit ? "submit" : "button"}
					fullWidth={fullWidth}
					variant='contained'
				>
					{label}
				</Button>
			)}
		</Box>
	);
};

ButtonCustomized.propTypes = {
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
};

ButtonCustomized.defaultProps = {
	label: "",
	variant: "contained",
	icono: null,
	classesCustom: {},
	onClick: null,
	border: false,
	isSubmit: false,
};

export default ButtonCustomized;
