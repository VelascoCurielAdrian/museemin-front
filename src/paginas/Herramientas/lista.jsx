import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Header } from "../../componentes/Header/cointainer";
import { Table } from "../../componentes/Table/container";
import GQL from "./helper";

const columns = [
	{ field: "id", headerName: "ID", width: 120 },
	{
		field: "nombre",
		headerName: "Nombre",
		width: 150,
		editable: false,
	},
	{
		field: "descripcion",
		headerName: "DESCRIPCIÓN",
		width: 280,
		editable: false,
	},
	{
		field: "precio",
		headerName: "PRECIO",
		width: 150,
		editable: false,
	},
	{
		field: "marca",
		headerName: "MARCA",
		width: 150,
		editable: false,
	},
	{
		field: "clasificacion",
		headerName: "CLASIFICACIÓN",
		width: 150,
		editable: false,
		valueGetter: ({ value }) => value.descripcion,
	},
];

export const Herramientas = () => {
	const navigate = useNavigate();
	const { data, loading, error } = useQuery(GQL.GET, {
		variables: {
			offset: null,
			limit: null,
		},
	});

	const handleNew = () => {
		navigate("/herramienta/formulario");
	};
	return (
		<>
			<Header
				title='Herramientas'
				subtitle='Moduló de Herramientas'
				listado
				handleNew={handleNew}
			/>
			<Table
				columns={columns}
				rows={data ? data.getAllHerramientas?.rows : []}
				loading={loading}
				error={error}
			/>
		</>
	);
};
