import { useNavigate } from 'react-router-dom';
import GQL, { dataCache } from './helper';
import { Table } from '../../componentes/Table/component';
import { Estatus } from '../../componentes/Estatus/component';
import { EstadoHerramienta } from '../../componentes/EstadoHerramienta/component';

const columns = [
	{ field: 'id', headerName: 'ID', width: 80 },
	{
		field: 'nombre',
		headerName: 'Nombre',
		width: 150,
		editable: false,
	},
	{
		field: 'descripcion',
		headerName: 'DESCRIPCIÓN',
		width: 150,
		editable: false,
	},
	{
		field: 'precio',
		headerName: 'PRECIO',
		width: 80,
		editable: false,
	},
	{
		field: 'marca',
		headerName: 'MARCA',
		width: 80,
		editable: false,
	},
	{
		field: 'clasificacion',
		headerName: 'CLASIFICACIÓN',
		width: 150,
		editable: false,
		valueGetter: ({ value }) => value.descripcion,
	},
	{
		field: 'estado',
		headerName: 'CONDICIÓN',
		width: 120,
		editable: false,
		renderCell: ({ value, index }) => (
			<EstadoHerramienta key={index} value={value} />
		),
	},
	{
		field: 'estatus',
		headerName: 'ESTATUS',
		width: 120,
		editable: false,
		renderCell: ({ value, index }) => <Estatus key={index} value={value} />,
	},
];

export const Herramientas = () => {
	const navigate = useNavigate();
	const handleNew = () => {
		navigate('/herramienta/formulario');
	};
	return (
		<>
			<Table
				title="Herramientas"
				subtitle="Moduló de Herramientas"
				showHeader
				handleNew={handleNew}
				uri={GQL.GET}
				urlDelete={{ gql: GQL.DELETE, params: 'deleteHerramientaId' }}
				dataCache={dataCache}
				columns={columns}
				showActions
			/>
		</>
	);
};
