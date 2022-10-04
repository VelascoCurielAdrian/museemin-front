import { useState } from 'react';
import { Formik } from 'formik';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineMiscellaneousServices } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../componentes/Button';
import TextField from '../../componentes/TextField';
import { Header } from '../../componentes/Header/cointainer';
import { SelecField } from '../../componentes/Select/component';

import GQL, { estadoHerramienta, validacion, dataCache } from './helper';
import { useFormularion } from '../../hooks/useForm';
import { TipoServicio } from '../TipoServicios/formulario';
const dataInicial = {
	tipoServicioID: '',
	clienteID: '',
	trabajadores: [],
	estado: '',
	estatus: '',
	nombre: '',
	marca: '',
	precio: '',
	descripcion: '',
};

export const Servicio = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const { data: Clientes } = useQuery(GQL.GET_CLIENTES, {
		variables: {
			limit: null,
			offset: null,
		},
	});

	console.log(Clientes);

	const { data } = useQuery(GQL.GET_TIPO_SERVICIO, {
		variables: {
			offset: null,
			limit: null,
		},
	});

	const handleBack = () => {
		navigate('/servicios', {
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

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	if (loading) return <div>Cargando...</div>;
	return (
		<>
			<Header
				title="Servicios"
				subtitle="Moduló de servicios"
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
								descripcion: values.descripcion,
								marca: values.marca,
								estado: values.estado,
								precio: values.precio,
								usuarioRegistroID: 1,
								clasificacionID: values.clasificacionID,
								estatus: values.estatus,
							};
							ActionForm({
								variables: { updateHerramientaId: id, input },
							});
						}}
					>
						{({ handleChange, values, touched, errors }) => (
							<div className="overflow-hidden shadow sm:rounded-md">
								<div className="bg-white px-4 py-5 sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-2">
											<SelecField
												fullWidth
												size="small"
												label="Tipo de servicio"
												labelProp="descripcion"
												name="tipoServicioID"
												onChange={handleChange}
												value={values.tipoServicioID || ''}
												options={data?.getAllTipoServicios?.rows || []}
												helperText={
													touched.tipoServicioID && errors.tipoServicioID
												}
												error={
													touched.tipoServicioID &&
													Boolean(errors.tipoServicioID)
												}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<label
												htmlFor="tipoServicio"
												className="block text-sm mb-1 font-medium text-gray-700"
											>
												Gestionar tipos de servicios
											</label>
											<Button
												size="medium"
												label="Agregar"
												fullWidth
												className="bg-gray-700"
												onClick={handleClickOpen}
												icono={<MdOutlineMiscellaneousServices size={16} />}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<SelecField
												fullWidth
												size="small"
												labelProp="nombre"
												name="clienteID"
												onChange={handleChange}
												value={values.clienteID}
												label="Cliente"
												options={Clientes?.getAllCliente?.rows || []}
												helperText={touched.clienteID && errors.clienteID}
												error={touched.clienteID && Boolean(errors.clienteID)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<SelecField
												fullWidth
												size="small"
												labelProp="nombre"
												name="trabajadores"
												onChange={handleChange}
												value={[]}
												label="Trabjadores"
												multiple
												options={estadoHerramienta}
												IconComponent={(props) => (
													<IoIosArrowDown {...props} size={20} />
												)}
												helperText={touched.trabajadores && errors.trabajadores}
												error={
													touched.trabajadores && Boolean(errors.trabajadores)
												}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												size="small"
												label="Fecha del servicio"
												name="nombre"
												value={values.estado}
												onChange={handleChange}
												helperText={touched.estado && errors.estado}
												error={touched.estado && Boolean(errors.estado)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<SelecField
												fullWidth
												size="small"
												labelProp="nombre"
												name="estado"
												onChange={handleChange}
												value={values.estado}
												label="Estatus"
												options={estadoHerramienta}
												helperText={touched.estado && errors.estado}
												error={touched.estado && Boolean(errors.estado)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-3">
											<TextField
												fullWidth
												type="multiline"
												label="Descripción"
												name="descripcion"
												value={values.descripcion}
												onChange={handleChange}
												helperText={touched.descripcion && errors.descripcion}
												error={
													touched.descripcion && Boolean(errors.descripcion)
												}
											/>
										</div>
									</div>
								</div>
							</div>
						)}
					</Formik>
				</div>
			</>
			<TipoServicio open={open} handleClose={handleClose} />
		</>
	);
};
