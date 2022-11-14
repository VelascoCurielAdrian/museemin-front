import { useNavigate } from 'react-router-dom';
import { Table } from '../../componentes/Table/component';
import { Estatus } from '../../componentes/Estatus/component';
import { Generos } from '../../componentes/Genero/component';
import { TrabajadoresActions } from '../../actions/trabajadores';

const columns = [
	{ field: 'id', headerName: 'ID', width: 30 },
	{
		field: 'nombres',
		headerName: 'NOMBRE',
		width: 180,
		editable: false,
		valueGetter: ({ row }) =>
			`${row.nombres} ${row.primerApellido} ${row.segundoApellido}`,
	},
	{
		field: 'telefono',
		headerName: 'TÉLEFONO',
		width: 100,
		editable: false,
	},
	{
		field: 'correo',
		headerName: 'CORREO',
		width: 180,
		editable: false,
	},
	{
		field: 'colonia',
		headerName: 'DOMICILIO',
		width: 300,
		editable: false,
		valueGetter: ({ row }) =>
			`${row.colonia} ${row.calles} ${row.referencia} ${row.numeroExterior}`,
	},
	{
		field: 'sexo',
		headerName: 'GÉNERO',
		width: 120,
		editable: false,
		renderCell: ({ value, index }) => <Generos key={index} value={value} />,
	},
	{
		field: 'estatus',
		headerName: 'ACTIVO',
		width: 120,
		editable: false,
		renderCell: ({ value, index }) => <Estatus key={index} value={value} />,
	},
];

export const Trabajadores = () => {
	const navigate = useNavigate();
	const handleNew = () => {
		navigate('/trabajador/formulario');
	};
	return (
		<>
			<Table
				title="Trabajadores"
				subtitle="Moduló de Trabajadores"
				showHeader
				handleNew={handleNew}
				uri={TrabajadoresActions.GET}
				urlDelete={{ gql: TrabajadoresActions.DELETE, params: 'deleteId' }}
				dataCache="getAllTrabajador"
				columns={columns}
				showActions
			/>
		</>
	);
};
