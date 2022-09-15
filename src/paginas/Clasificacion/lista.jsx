import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../componentes/Header/cointainer';
import { Table } from '../../componentes/Table/container';
import GQL from './helper';

const columns = [
	{ field: 'id', headerName: 'ID', width: 120 },
	{
		field: 'descripcion',
		headerName: 'DESCRIPCIÓN',
		width: 150,
		editable: false,
	},
];

export const Clasificaciones = () => {
	const navigate = useNavigate();
	const { data, loading, error } = useQuery(GQL.GET, {
		variables: {
			offset: null,
			limit: null,
		},
	});

	const handleNew = () => {
		navigate('/clasificacion/formulario');
	};
	return (
		<>
			<Header
				title='Clasificacion'
				subtitle='Moduló de clasificaciones'
				listado
				handleNew={handleNew}
			/>
			<Table
				columns={columns}
				rows={data? data.getAllCountClasificacion.rows : []}
				loading={loading}
				error={error}
			/>
		</>
	);
};
