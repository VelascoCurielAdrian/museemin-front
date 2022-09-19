import { useMemo } from "react";
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

const estadoHerramienta = [
	{ id: 1, nombre: "Nuevo", color: "success" },
	{ id: 2, nombre: "Usado", color: "warning" },
	{ id: 3, nombre: "Dañado", color: "error" },
];

const getEstado = (value) => {
	return estadoHerramienta.find((estado) => estado.id === value);
};

const Container = styled(Chip)(() => ({
	display: "flex",
	alignItems: "center",
	width: 80,
}));

export const EstadoHerramienta = ({ value, key }) => {
	const estado = useMemo(() => getEstado(value), [value]);
	return (
		<Container
			key={key}
			size='small'
			color={estado?.color}
			label={estado?.nombre}
		/>
	);
};
