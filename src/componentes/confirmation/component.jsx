import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { MdDeleteForever } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import ButtonCustomized from "../Button";
import { Popover, Typography } from "@mui/material";

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === "light"
				? "rgb(55, 65, 81)"
				: theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity,
				),
			},
		},
	},
}));

const Actions = styled("div")(() => ({
	display: "flex",
	justifyContent: "center",
	marginBottom: 10,
	"& button": {
		margin: "0px 2px",
	},
}));
export const Confirmation = ({
	anchorEl,
	open,
	handleClose,
	handleDelete,
	loading,
}) => {
	return (
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{ horizontal: "left", vertical: "top" }}
			transformOrigin={{ horizontal: "left", vertical: "top" }}
			PaperProps={{
				style: {
					transform: "translateX(-100px) translateY(-20px)",
				},
			}}
		>
			<Typography sx={{ p: 1.5 }}>
				¿Esta seguro de eliminar el elemento?
			</Typography>
			<Actions>
				<ButtonCustomized
					label='Cancelar'
					onClick={handleClose}
					icono={<GiCancel />}
				/>
				<ButtonCustomized
					label='Aceptar'
					loading={loading}
					onClick={handleDelete}
					icono={<MdDeleteForever />}
				/>
			</Actions>
		</Popover>
	);
};
