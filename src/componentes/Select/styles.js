import { makeStyles } from "@mui/styles";
import paleta from "../../configuracion/paleta";

const styles = makeStyles(() => ({
	root: {
		marginTop: 5,
	},
	"@global": {
		".MuiPopover-paper": {
			border: `1px solid ${paleta.textField.border}`,
			justifyContent: "flex-end",
		},
	},
	label: {
		fontSize: 12,
		fontWeight: "bold",
	},
	input: {
		minHeight: 45,
		height: 45,
		marginTop: 10,
		backgroundColor: paleta.textField.backgroundColor,
		borderRadius: 8,
		outline: "none",
		width: "95%",
		padding: "0 10px",
		"& fieldset": {
			border: `1px solid ${paleta.textField.border} !important`,
		},
		"&:hover, &:focus": {
			backgroundColor: paleta.textField.backgroundColorHover,
			"& fieldset": {
				border: `1px solid ${paleta.textField.border} !important`,
			},
		},
		"&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			border: `1px solid ${paleta.textField.border}`,
		},
		"& .MuiSelect-root": {
			minHeight: 45,
			height: 45,
			padding: "0px !important",
			display: "flex",
			alignItems: "center",
		},
	},
	li: {
		backgroundColor: "transparent !important",
		"&:hover": {
			backgroundColor: `${paleta.textField.backgroundColorHover} !important`,
		},
		"&.Mui-selected": {
			fontWeight: 600,
		},
	},
	error: {
		"& .MuiInputBase-root": {
			border: `1px solid ${paleta.textField.error}`,
		},
	},
	helperText: {
		marginTop: 5,
		marginLeft: 8,
		"&.error": {
			color: paleta.textField.error,
		},
	},
	chips: {
		width: 83,
		maxWidth: 83,
		backgroundColor: "#409a8e",
		fontWeight: "bold",
		color: "#FFF",
		borderRadius: 6,
		height: 25,
		marginLeft: 2,
		padding: 0,
	},
	chipsMas: {
		width: 65,
		maxWidth: 65,
		backgroundColor: "#409a8e",
		fontWeight: "bold",
		color: "#FFF",
		borderRadius: 6,
		height: 25,
		marginLeft: 1,
		padding: 0,
	},
	iconDelete: {
		color: paleta.sidebar.backgroundColor,
		width: 15,
		minWidth: 15,
		marginLeft: "auto",
	},
}));

export default styles;
