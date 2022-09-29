import * as React from "react";
import { styled } from "@mui/material/styles";
import { MdDeleteForever } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import ButtonCustomized from "../Button";
import { Popover, Typography } from "@mui/material";
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
					transform: "translateX(-10px) translateY(-20px)",
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
