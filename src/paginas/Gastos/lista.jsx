import { useNavigate } from 'react-router-dom';
import { Table } from '../../componentes/Table/component';
import { GastosActions } from '../../actions/gastos';
import moment from 'moment';
import { EstadoMetodoPago } from '../../componentes/MetodoPago/component';

const columns = [
	{ field: 'id', headerName: 'ID', width: 30 },
	{
		field: 'fecha',
		headerName: 'FECHA',
		width: 170,
		editable: false,
		valueGetter: ({ row }) => moment(row.fecha).format('LL'),
	},
	{
		field: 'trabajadorID',
		headerName: 'TRABAJADOR',
		width: 170,
		editable: false,
		valueGetter: ({ row }) =>
			`${row.trabajador.nombres} ${row.trabajador.primerApellido} ${row.trabajador.segundoApellido}`,
	},
	{
		field: 'clienteID',
		headerName: 'CLIENTE',
		width: 120,
		editable: false,
		valueGetter: ({ row }) => `${row.cliente.nombre}`,
	},
	{
		field: 'importe',
		headerName: 'IMPORTE',
		width: 80,
		editable: false,
	},
	{
		field: 'diferencia',
		headerName: 'DIFERENCIA',
		width: 110,
		editable: false,
	},
	{
		field: 'subtotal',
		headerName: 'SUB TOTAL',
		width: 110,
		editable: false,
	},
	{
		field: 'total',
		headerName: 'TOTAL',
		width: 90,
		editable: false,
	},
	{
		field: 'metodoPago',
		headerName: 'METODO DE PAGO',
		width: 180,
		editable: false,
		renderCell: ({ value, index }) => (
			<EstadoMetodoPago key={index} value={2} />
		),
	},
];

export const Gastos = () => {
	const navigate = useNavigate();
	const handleNew = () => {
		navigate('/gastos/formulario');
	};
	return (
		<>
			<Table
				title="Gastos"
				subtitle="Moduló de gastos internos"
				showHeader
				handleNew={handleNew}
				uri={GastosActions.GET}
				urlDelete={{ gql: GastosActions.DELETE, params: 'deleteId' }}
				dataCache="getAllGastos"
				columns={columns}
				showActions
			/>
		</>
	);
};
