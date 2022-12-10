import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Table } from '../../componentes/Table/component';
import { formatPdCotizacion } from './pdf';
import { CotizacionesActions } from '../../actions/cotizaciones';
import ProcesoCotizacion from '../../componentes/ProcesoCotizacion';

const columns = [
	{ field: 'id', headerName: 'ID', width: 30 },
	{
		field: 'descripcion',
		headerName: 'DESCRIPCION',
		width: 290,
		editable: false,
	},
	{
		field: 'fecha',
		headerName: 'FECHA',
		width: 80,
		editable: false,
		valueGetter: ({ row }) => moment(row.fecha).format('L'),
	},
	{
		field: 'clienteID',
		headerName: 'CLIENTE',
		width: 170,
		editable: false,
		valueGetter: ({ row }) => `${row?.cliente?.nombre}`,
	},
	{
		field: 'proceso',
		headerName: 'PROCESO DE LA COTIZACIÓN',
		width: 220,
		editable: false,
		renderCell: ({ value, index }) => (
			<ProcesoCotizacion key={index} value={value} />
		),
	},
	{
		field: 'subTotal',
		headerName: 'SUB TOTAL',
		width: 110,
		editable: false,
	},
];

const dataCache = 'getAllCotizaciones';
export const Cotizaciones = () => {
	const navigate = useNavigate();
	const handleNew = () => {
		navigate('/cotizacion/formulario');
	};
	return (
		<>
			<Table
				title="Cotizaciones"
				subtitle="Moduló de cotizaciones"
				showHeader
				pdf={formatPdCotizacion}
				handleNew={handleNew}
				uri={CotizacionesActions.GET}
				urlDelete={{ gql: CotizacionesActions.DELETE, params: 'deleteId' }}
				dataCache={dataCache}
				columns={columns}
				showActions
				print
			/>
		</>
	);
};
