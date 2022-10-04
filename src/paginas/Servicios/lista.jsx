import { useNavigate } from 'react-router-dom';
import GQL, { dataCache } from './helper';
import { Table } from '../../componentes/Table/container';
import { Estatus } from '../../componentes/Estatus/component';
import { EstadoHerramienta } from '../../componentes/EstadoHerramienta/component';

const columns = [
	{ field: 'id', headerName: 'ID', width: 80 },
	{
		field: 'descripcion',
		headerName: 'DESCRIPCIÓN',
		width: 150,
		editable: false,
	},
	{
		field: 'precio',
		headerName: 'CLIENTE',
		width: 150,
		editable: false,
	},
	{
		field: 'preci',
		headerName: 'TRABAJADORES',
		width: 150,
		editable: false,
	},
	{
		field: '',
		headerName: 'FECHA',
		width: 80,
		editable: false,
	},
	{
		field: 'estatus',
		headerName: 'ESTATUS',
		width: 120,
		editable: false,
		renderCell: ({ value, index }) => <Estatus key={index} value={value} />,
	},
];

export const Servicios = () => {
	const navigate = useNavigate();
	const handleNew = () => {
		navigate('/servicio/formulario');
	};
	return (
		<>
			<Table
				title="Servicios"
				subtitle="Moduló de servicios"
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
