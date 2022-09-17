import { useState, useRef } from "react";
import { Formik } from "formik";
import { BsTools } from "react-icons/bs";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import Button from "../../componentes/Button";
import TextField from "../../componentes/TextField";
import { Header } from "../../componentes/Header/cointainer";
import { SelecField } from "../../componentes/Select/component";

import GQL, {
	estadoHerramienta,
	estatus,
	validacion,
	dataCache,
} from "./helper";
import { Clasificacion } from "../Clasificacion/formulario";
import { parseError } from "../../helpers";
import { toast } from "react-toastify";
import { useFormularion } from "../../componentes/Formulario/component";

const dataInicial = {
	clasificacionID: "",
	estadoID: "",
	estatusID: "",
	nombre: "",
	marca: "",
	precio: "",
	descripcion: "",
};

export const Herramienta = () => {
	const navigate = useNavigate();
	const handleBack = () => {
		navigate("/herramientas", {
			replace: true,
		});
	};
	const { ActionForm, submitForm, isLoading, formikRef } = useFormularion(
		{ action: "create" },
		dataCache,
		GQL.CREATE,
		GQL.CREATE,
		GQL.GET,
		handleBack,
	);

	const { data } = useQuery(GQL.GET_CLASIFICACION, {
		variables: {
			offset: null,
			limit: null,
		},
	});
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Header
				title='Herramientas'
				subtitle='Moduló de Herramientas'
				handleCancelar={handleBack}
				handleCreate={submitForm}
				loading={isLoading}
				agregar
			/>
			<>
				<div className='hidden sm:block' aria-hidden='true'>
					<div className='py-5'>
						<div className='border-t border-gray-200' />
					</div>
				</div>

				<div className='mt-5 md:col-span-2 md:mt-0'>
					<Formik
						innerRef={formikRef}
						initialValues={dataInicial}
						validationSchema={validacion}
						onSubmit={(values) => {
							const input = {
								nombre: values.nombre,
								descripcion: values.descripcion,
								marca: values.marca,
								estado: "21",
								precio: values.precio,
								usuarioRegistroID: 1,
								clasificacionID: values.clasificacionID,
								estatus: true,
							};
							ActionForm({
								variables: { input },
							});
						}}
					>
						{({ handleChange, values, touched, errors }) => (
							<div className='overflow-hidden shadow sm:rounded-md'>
								<div className='bg-white px-4 py-5 sm:p-6'>
									<div className='grid grid-cols-6 gap-6'>
										<div className='col-span-6 sm:col-span-2'>
											<TextField
												fullWidth
												size='small'
												label='Nombre'
												name='nombre'
												autoFocus
												value={values.nombre}
												onChange={handleChange}
												helperText={touched.nombre && errors.nombre}
												error={touched.nombre && Boolean(errors.nombre)}
											/>
										</div>
										<div className='col-span-6 sm:col-span-2'>
											<SelecField
												fullWidth
												size='small'
												label='Clasificaciones'
												labelProp='descripcion'
												name='clasificacionID'
												options={data?.getAllCountClasificacion?.rows || []}
												helperText={
													touched.clasificacionID && errors.clasificacionID
												}
												error={
													touched.clasificacionID &&
													Boolean(errors.clasificacionID)
												}
												value={values.clasificacionID || ""}
												onChange={handleChange}
											/>
										</div>
										<div className='col-span-6 sm:col-span-2'>
											<label
												htmlFor='clasificacion'
												className='block text-sm mb-1 font-medium text-gray-700'
											>
												Gestionar Clasificaciones
											</label>
											<Button
												size='medium'
												label='Agregar'
												fullWidth
												className='bg-gray-700'
												onClick={handleClickOpen}
												icono={<BsTools size={16} />}
											/>
										</div>
										<div className='col-span-6 sm:col-span-2'>
											<TextField
												fullWidth
												size='small'
												label='Precio'
												type='number'
												name='precio'
												value={values.precio}
												onChange={handleChange}
												helperText={touched.precio && errors.precio}
												error={touched.precio && Boolean(errors.precio)}
											/>
										</div>
										<div className='col-span-6 sm:col-span-2'>
											<TextField
												fullWidth
												size='small'
												label='Marca'
												name='marca'
												value={values.marca}
												onChange={handleChange}
												helperText={touched.marca && errors.marca}
												error={touched.marca && Boolean(errors.marca)}
											/>
										</div>
										<div className='col-span-6 sm:col-span-2'>
											<SelecField
												fullWidth
												size='small'
												labelProp='nombre'
												name='estadoID'
												onChange={handleChange}
												value={values.estadoID}
												label='Estado de la herramienta'
												options={estadoHerramienta}
												helperText={touched.estadoID && errors.estadoID}
												error={touched.estadoID && Boolean(errors.estadoID)}
											/>
										</div>
										<div className='col-span-6 sm:col-span-2'>
											<SelecField
												fullWidth
												size='small'
												label='Estatus'
												labelProp='nombre'
												name='estatusID'
												options={estatus}
												onChange={handleChange}
												value={values.estatusID}
												helperText={touched.estatusID && errors.estatusID}
												error={touched.estatusID && Boolean(errors.estatusID)}
											/>
										</div>
										<div className='col-span-6 sm:col-span-3'>
											<TextField
												fullWidth
												type='multiline'
												label='Descripción'
												name='descripcion'
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
