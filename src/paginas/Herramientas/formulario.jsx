import { useState } from 'react';
import { Formik } from 'formik';
import { BsTools } from 'react-icons/bs';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Button from '../../componentes/Button';
import useFormActions from '../../hooks/useFormv2';
import TextField from '../../componentes/TextField';
import { ClasificacionActions } from '../../actions';
import { Clasificacion } from '../Clasificacion/formulario';
import { Header } from '../../componentes/Header/component';
import { SelecField } from '../../componentes/Select/component';
import { estadoHerramienta, estatus } from '../../helpers/constants';
import { HerramientasActions, Validate } from '../../actions/herramientas';

const dataInicial = {
	clasificacionID: '',
	estado: '',
	estatus: '',
	nombre: '',
	marca: '',
	precio: '',
	descripcion: '',
};

export const Herramienta = () => {
	const { id } = useParams();
	const [open, setOpen] = useState(false);
	const { save, formRef, values, loading, isLoading, actionForm } =
		useFormActions({
			method: id ? 'update' : 'create',
			actions: HerramientasActions,
			operation: 'getAllHerramientas',
			formData: dataInicial,
			name: 'herramientas',
			id,
		});

	const { data } = useQuery(ClasificacionActions.GET, {
		variables: {
			offset: null,
			limit: null,
		},
	});

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
				name="herramientas"
				title="Herramientas"
				subtitle="Moduló de Herramientas"
				handleCreate={save}
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
						innerRef={formRef}
						initialValues={values}
						validationSchema={Validate}
						onSubmit={(values) => {
							actionForm({
								variables: { updateID: id, ...values },
							});
						}}
					>
						{({ handleChange, values, touched, errors }) => (
							<div className="overflow-hidden shadow sm:rounded-md">
								<div className="bg-white px-4 py-5 sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-2">
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
										</div>
										<div className="col-span-6 sm:col-span-2">
											<SelecField
												fullWidth
												size="small"
												label="Clasificaciones"
												labelProp="descripcion"
												name="clasificacionID"
												onChange={handleChange}
												value={values.clasificacionID || ''}
												options={data?.getAllCountClasificacion?.rows || []}
												helperText={
													touched.clasificacionID && errors.clasificacionID
												}
												error={
													touched.clasificacionID &&
													Boolean(errors.clasificacionID)
												}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<label
												htmlFor="clasificacion"
												className="block text-sm mb-1 font-medium text-gray-700"
											>
												Gestionar Clasificaciones
											</label>
											<Button
												size="medium"
												label="Agregar"
												fullWidth
												className="bg-gray-700"
												onClick={handleClickOpen}
												icono={<BsTools size={16} />}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												size="small"
												label="Precio"
												type="number"
												name="precio"
												value={values.precio}
												onChange={handleChange}
												helperText={touched.precio && errors.precio}
												error={touched.precio && Boolean(errors.precio)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												size="small"
												label="Marca"
												name="marca"
												value={values.marca}
												onChange={handleChange}
												helperText={touched.marca && errors.marca}
												error={touched.marca && Boolean(errors.marca)}
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
												label="Estado de la herramienta"
												options={estadoHerramienta}
												helperText={touched.estado && errors.estado}
												error={touched.estado && Boolean(errors.estado)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
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
			<Clasificacion open={open} handleClose={handleClose} />
		</>
	);
};
