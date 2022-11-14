import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { GastosActions } from '../../actions/gastos';
import { Table } from '../../componentes/Table/component';
import { EstadoMetodoPago } from '../../componentes/MetodoPago/component';
import { formatPdfGasto } from './pdf';

const columns = [
	{ field: 'id', headerName: 'ID', width: 30 },
	{
		field: 'fecha',
		headerName: 'FECHA',
		width: 80,
		editable: false,
		valueGetter: ({ row }) => moment(row.fecha).format('L'),
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
		field: 'tipoGasto',
		headerName: 'TIPO DE GASTO',
		width: 150,
		editable: false,
		valueGetter: ({ row }) => {
			if (row.tipoGasto === 1) {
				return `Externo a ${row?.cliente?.nombre}`;
			}
			return 'Gasto Interno';
		},
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
		field: 'subTotal',
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
			<EstadoMetodoPago key={index} value={value} />
		),
	},
];

const dataCache = 'getAllGastos';
export const Gastos = () => {
	const navigate = useNavigate();
	const handleNew = () => {
		navigate('/gastos/formulario');
	};
	return (
		<>
			<Table
				title="Gastos"
				subtitle="Moduló de gastos internos y externos"
				showHeader
				pdf={formatPdfGasto}
				handleNew={handleNew}
				uri={GastosActions.GET}
				urlDelete={{ gql: GastosActions.DELETE, params: 'deleteId' }}
				dataCache={dataCache}
				columns={columns}
				showActions
				print
			/>
		</>
	);
};
