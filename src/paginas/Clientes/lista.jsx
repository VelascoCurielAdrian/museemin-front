import { useNavigate } from 'react-router-dom';
import GQL, { dataCache } from './helper';
import { Table } from '../../componentes/Table/container';
import { Estatus } from '../../componentes/Estatus/component';

const columns = [
	{ field: 'id', headerName: 'ID', width: 80 },
	{
		field: 'nombre',
		headerName: 'NOMBRE',
		width: 180,
		editable: false,
	},
	{
		field: 'primerTelefono',
		headerName: 'TÉLEFONO',
		width: 100,
		editable: false,
	},
	{
		field: 'correo',
		headerName: 'CORREO',
		width: 200,
		editable: false,
	},
	{
		field: 'colonia',
		headerName: 'DOMICILIO',
		width: 350,
		editable: false,
		valueGetter: ({ row }) =>
			`${row.colonia} ${row.calles} ${row.referencia} ${row.numeroExterior}`,
	},
	{
		field: 'estatus',
		headerName: 'ACTIVO',
		width: 120,
		editable: false,
		renderCell: ({ value, index }) => <Estatus key={index} value={value} />,
	},
];

export const Clientes = () => {
	const navigate = useNavigate();
	const handleNew = () => {
		navigate('/cliente/formulario');
	};
	return (
		<>
			<Table
				title="Clientes"
				subtitle="Moduló de clientes"
				showHeader
				handleNew={handleNew}
				uri={GQL.GET}
				urlDelete={{ gql: GQL.DELETE, params: 'deleteClienteId' }}
				dataCache={dataCache}
				columns={columns}
				showActions
			/>
		</>
	);
};
