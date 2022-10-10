import { useState, Fragment } from 'react';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import { Header } from '../../componentes/Header/component';
import { Estatus } from '../../componentes/Estatus/component';
import { EstadoHerramienta } from '../../componentes/EstadoHerramienta/component';

import GQL, { validacion, dataCache } from './helper';
import { useFormularion } from '../../hooks/useForm';
import { Table } from '../../componentes/Table/component';
import { SearchField } from '../../componentes/SearchField/component';
import { IconButton, Tooltip } from '@mui/material';
import { CgAdd } from 'react-icons/cg';
import { TableBase } from '../../componentes/TableBase/component';

const columns = [
	{ field: 'id', headerName: 'ID', width: 80 },
	{
		field: 'nombre',
		headerName: 'Nombre',
		width: 150,
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

const dataInicial = {
	herramientaID: '',
	estado: '',
	estatus: '',
	nombre: '',
	marca: '',
	precio: '',
	descripcion: '',
};

export const PaqueteHerramientas = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [dataHerramientas, setDataHerramientas] = useState([]);

	const handleBack = () => {
		navigate('/paqueteHerramientas', {
			replace: true,
		});
	};

	const { ActionForm, submitForm, isLoading, formikRef, dataForm, loading } =
		useFormularion(
			{ action: id ? 'update' : 'create' },
			{ filter: 'getHerramientaId', id },
			dataInicial,
			dataCache,
			GQL.CREATE,
			GQL.UPDATE,
			GQL.GET,
			GQL.GET_BYID,
			handleBack,
		);

	const handleAdd = (value) => {
		setDataHerramientas([...dataHerramientas, value]);
	};

	const columnsHerramientas = [
		{
			field: 'nombre',
			headerName: 'NOMBRE',
			width: 150,
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
			field: 'actions',
			headerName: 'ACCIÓN',
			editable: false,
			renderCell: ({ row, index }) => {
				return (
					<Fragment>
						<Tooltip
							title="Agregar"
							placement="left"
							arrow
							onClick={() => {
								handleAdd(row, index);
							}}
						>
							<IconButton>
								<CgAdd size={20} className="text-green-700" />
							</IconButton>
						</Tooltip>
					</Fragment>
				);
			},
		},
	];

	if (loading) return <div>Cargando...</div>;
	return (
		<>
			<Header
				title="Paquete de herramientas"
				subtitle="Moduló de paquetes Herramientas"
				handleCancelar={handleBack}
				handleCreate={submitForm}
				loading={isLoading}
				agregar
			/>
			<>
				<div className="hidden sm:block" aria-hidden="true">
					<div className="py-5">
						<div className="border-t border-gray-200" />
					</div>
				</div>

				<div className="mt-5 md:col-span-2 md:mt-0">
					<Formik
						innerRef={formikRef}
						initialValues={dataForm}
						validationSchema={validacion}
						onSubmit={(values) => {
							const input = {
								nombre: values.nombre,
							};
							ActionForm({
								variables: { updateHerramientaId: id, input },
							});
						}}
					>
						{({ handleChange, values, touched, errors }) => (
							<div className="overflow-hidden shadow sm:rounded-md">
								<div className="bg-white px-5 py-5 sm:p-2">
									<div className="grid grid-cols-8 gap-2">
										<div className="col-span-8 sm:col-span-3 space-y-3">
											<label
												htmlFor="label-form"
												className="block mb-2 text-sm font-medium text-gray-700"
											>
												Seleccione las herramientas del paquete
											</label>
											<SearchField />
											<Table
												showPaginate={false}
												height={250}
												uri={GQL.GET}
												urlDelete={{
													gql: GQL.DELETE,
													params: 'deleteHerramientaId',
												}}
												dataCache={dataCache}
												columns={columnsHerramientas}
											/>
										</div>
										<div className="col-span-8 sm:col-span-5">
											<label
												htmlFor="label-form"
												className="block mb-2 text-sm font-medium text-gray-700"
											>
												Tabla de herramientas agregadas
											</label>
											<TableBase
												showPaginate={false}
												columns={columns}
												data={dataHerramientas}
											/>
										</div>
									</div>
								</div>
							</div>
						)}
					</Formik>
				</div>
			</>
		</>
	);
};
