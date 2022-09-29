import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import GQL, { dataCache } from './helper';
import { Header } from '../../componentes/Header/cointainer';
import { Table } from '../../componentes/Table/container';
import { EstadoHerramienta } from '../../componentes/EstadoHerramienta/component';
import { Estatus } from '../../componentes/Estatus/component';

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
		headerName: 'ACTIVO',
		width: 120,
		editable: false,
		renderCell: ({ value, index }) => <Estatus key={index} value={value} />,
	},
];

export const PaqueteHerramientas = () => {
	const navigate = useNavigate();
	const handleNew = () => {
		navigate('/paqueteHerramienta/formulario');
	};
	return (
		<>
			<Header
				title="Paquete de herramientas"
				subtitle="Moduló de paquetes Herramientas"
				listado
				handleNew={handleNew}
			/>
			<Table
				uri={GQL.GET}
				urlDelete={{ gql: GQL.DELETE, params: 'deleteHerramientaId' }}
				dataCache={dataCache}
				columns={columns}
				showActions
			/>
		</>
	);
};
