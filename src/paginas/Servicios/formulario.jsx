import { useState } from 'react';
import { Formik, useFormik } from 'formik';
import { FaToolbox } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineMiscellaneousServices } from 'react-icons/md';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import Button from '../../componentes/Button';
import TextField from '../../componentes/TextField';
import { useFormularion } from '../../hooks/useForm';
import { TipoServicio } from '../TipoServicios/formulario';
import { Header } from '../../componentes/Header/component';
import { SelecField } from '../../componentes/Select/component';
import { TrabajadoresActions } from '../../actions/trabajadores';
import { ListCheckBox } from '../../componentes/ListCheckBox/component';
import GQL, { estadoHerramienta, validacion, dataCache } from './helper';

const clientes = [
	{
		id: 0,
		name: 'Cedis Farmacon',
	},
	{
		id: 1,
		name: 'Cedis Coppel',
	},
	{
		id: 2,
		name: 'Cedis Walmart',
	},
	{
		id: 3,
		name: 'Cedis OXXO',
	},
	{
		id: 4,
		name: 'Cedis Frialsa',
	},
	{
		id: 5,
		name: 'Cedis Imms',
	},
];
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

export const Servicios = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(new Date());

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

	const getFullName = (value) => {
		return `${value.nombres} ${value.primerApellido} ${value.segundoApellido}`;
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
									<div className="grid grid-cols-8 gap-2">
										<div className="col-span-12 lg:col-span-3 md:col-span-12 sm:col-span-12 space-y-3">
											<SelecField
												fullWidth
												size="small"
												labelProp="name"
												name="clienteID"
												onChange={handleChange}
												value={values.clienteID}
												label="Clientes"
												options={clientes || []}
												helperText={touched.clienteID && errors.clienteID}
												error={touched.clienteID && Boolean(errors.clienteID)}
											/>
										</div>
										<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
											<MobileDatePicker
												value={value}
												onChange={(newValue) => {
													setValue(newValue);
												}}
												renderInput={(params) => (
													<TextField
														{...params}
														size="small"
														fullWidth
														label="Fecha del servicio"
														value={params.inputProps.value}
													/>
												)}
											/>
										</div>
										<div className="col-span-12 lg:col-span-3 md:col-span-12 sm:col-span-12 space-y-2">
											<SelecField
												fullWidth
												size="small"
												name="estado"
												label="Estatus"
												labelProp="nombre"
												value={values.estado}
												onChange={handleChange}
												options={estadoHerramienta}
												helperText={touched.estado && errors.estado}
												error={touched.estado && Boolean(errors.estado)}
											/>
										</div>
										<div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-2">
											<label
												htmlFor="tipoServicio"
												className="block text-sm mb-1 font-medium text-gray-700"
											>
												Seleccione el tipo de servicio
											</label>
											<ListCheckBox
												gql={GQL.GET_TIPO_SERVICIO}
												operation="getAllTipoServicios"
												valueProp="descripcion"
												icon={<FaToolbox size={16} className="text-white" />}
											/>
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
												icon={<MdOutlineMiscellaneousServices size={16} />}
											/>
										</div>
										<div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-2">
											<label
												htmlFor="tipoServicio"
												className="block text-sm mb-1 font-medium text-gray-700"
											>
												Trabajadores
											</label>
											<ListCheckBox
												gql={TrabajadoresActions.GET}
												operation="getAllTrabajador"
												getValue={getFullName}
												icon={<HiUserGroup size={16} className="text-white" />}
											/>
											<TextField
												fullWidth
												type="multiline"
												label="Comentarios"
												name="descripcion"
												value={values.descripcion}
												onChange={handleChange}
												helperText={touched.descripcion && errors.descripcion}
												error={touched.descripcion && Boolean(errors.descripcion)}
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
