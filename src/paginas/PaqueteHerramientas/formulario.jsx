import { useState, useMemo } from 'react';
import { Formik } from 'formik';
import { BsTools } from 'react-icons/bs';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../componentes/Button';
import TextField from '../../componentes/TextField';
import { Header } from '../../componentes/Header/cointainer';
import { Estatus } from '../../componentes/Estatus/component';
import { SelecField } from '../../componentes/Select/component';
import { EstadoHerramienta } from '../../componentes/EstadoHerramienta/component';

import GQL, { estatus, validacion, dataCache } from './helper';
import { useFormularion } from '../../hooks/useForm';
import { Table } from '../../componentes/Table/container';

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

export const PaqueteHerramienta = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data } = useQuery(GQL.GET, {
		variables: {
			offset: null,
			limit: null,
		},
	});

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
								<div className="bg-white px-5 py-5 sm:p-6">
									<div className="grid grid-cols-8 gap-2">
										<div className="col-span-8 sm:col-span-3 space-y-3">
											<TextField
												fullWidth
												size="small"
												label="Nombre"
												name="nombre"
												autoFocus
												value={values.nombre}
												onChange={handleChange}
												helperText={touched.nombre && errors.nombre}
												error={touched.nombre && Boolean(errors.nombre)}
											/>
											<SelecField
												fullWidth
												size="small"
												label="Estatus"
												labelProp="nombre"
												name="estatus"
												options={estatus}
												onChange={handleChange}
												value={values.estatus}
												helperText={touched.estatus && errors.estatus}
												error={touched.estatus && Boolean(errors.estatus)}
											/>
											<SelecField
												fullWidth
												size="small"
												label="Herramienta"
												labelProp="nombre"
												name="herramientaID"
												options={data?.getAllHerramientas?.rows || []}
												onChange={handleChange}
												value={values.herramientaID}
												helperText={
													touched.herramientaID && errors.herramientaID
												}
												error={
													touched.herramientaID && Boolean(errors.herramientaID)
												}
											/>
											<TextField
												fullWidth
												size="small"
												label="Descripción"
												name="nombre"
												autoFocus
												value={values.nombre}
												onChange={handleChange}
												helperText={touched.nombre && errors.nombre}
												error={touched.nombre && Boolean(errors.nombre)}
											/>
											<Button
												size="medium"
												label="Agregar"
												fullWidth
												className="bg-gray-700"
												onClick={() => {}}
												icono={<BsTools size={16} />}
											/>
										</div>
										<div className="col-span-8 sm:col-span-5">
											<label
												htmlFor="label-form"
												className="block mb-2 text-sm font-medium text-gray-700"
											>
												Tabla de herramientas
											</label>
											<Table
												uri={GQL.GET}
												urlDelete={{
													gql: GQL.DELETE,
													params: 'deleteHerramientaId',
												}}
												dataCache={dataCache}
												columns={columns}
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
