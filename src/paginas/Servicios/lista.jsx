import { useNavigate } from 'react-router-dom';
import GQL, { dataCache } from './helper';
import { Table } from '../../componentes/Table/component';
import { Estatus } from '../../componentes/Estatus/component';
import { EstadoHerramienta } from '../../componentes/EstadoHerramienta/component';

const rowsData = [
	{
		id: 1,
		comentarios: 'Nota el servicio es garantia',
		servicio: 'Servicio de plomeria',
		cliente: 'Adrian Velasco Curiel',
		trabajador: 'juan rodrigez perez',
		fecha: '12/10/2022',
		estatus: false,
	},
	{
		id: 2,
		comentarios: 'Nota la cortina esta dañada',
		servicio: 'Servicio de herreria',
		cliente: 'Javier Velasco Curiel',
		trabajador: 'Pedro velasco perez, juan rodrigez perez',
		fecha: '12/10/2022',
		estatus: true,
	},
	{
		id: 3,
		comentarios: 'Nota el servicio llevara mas material',
		servicio: 'Servicio de mantenimiento en refrigeración',
		cliente: 'Juan Velasco Curiel',
		trabajador: 'Pedro velasco perez',
		fecha: '12/10/2022',
		estatus: false,
	},
	{
		id: 4,
		comentarios: 'Nota el servicio es garantia',
		servicio: 'Servicio de albañileria',
		cliente: 'Pedro Velasco Curiel',
		trabajador: 'Pedro velasco perez',
		fecha: '12/10/2022',
		estatus: true,
	},
];

const columns = [
	{ field: 'id', headerName: 'ID', width: 80 },
	{
		field: 'comentarios',
		headerName: 'COMENTARIO',
		width: 250,
		editable: false,
	},
	{
		field: 'servicio',
		headerName: 'SERVICIO',
		width: 250,
		editable: false,
	},
	{
		field: 'cliente',
		headerName: 'CLIENTE',
		width: 150,
		editable: false,
	},
	{
		field: 'trabajador',
		headerName: 'TRABAJADORES',
		width: 250,
		editable: false,
	},
	{
		field: 'fecha',
		headerName: 'FECHA',
		width: 80,
		editable: false,
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
				dataFixed
				rowsData={rowsData}
				urlDelete={{ gql: GQL.DELETE, params: 'deleteHerramientaId' }}
				dataCache={dataCache}
				columns={columns}
				showActions
			/>
		</>
	);
};
