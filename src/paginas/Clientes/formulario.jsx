import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import TextField from '../../componentes/TextField';
import { Header } from '../../componentes/Header/component';
import { SelecField } from '../../componentes/Select/component';

import GQL, { estatus, validacion, dataCache } from './helper';
import { useFormularion } from '../../hooks/useForm';

const dataInicial = {
	nombre: '',
	primerTelefono: '',
	segundoTelefono: '',
	correo: '',
	colonia: '',
	calles: '',
	referencia: '',
	numeroExterior: '',
	numeroInterior: '',
	codigoPostal: '',
	usuarioRegistroID: '',
	estatus: '',
};

export const Cliente = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const handleBack = () => {
		navigate('/clientes', {
			replace: true,
		});
	};

	const { ActionForm, submitForm, isLoading, formikRef, dataForm, loading } = useFormularion(
		{ action: id ? 'update' : 'create'},
		{ filter: 'getClienteId', id },
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
				title="Clientes"
				subtitle="Moduló de clientes"
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
								primerTelefono: String(values.primerTelefono),
								segundoTelefono: String(values.segundoTelefono),
								correo: values.correo,
								colonia: values.colonia,
								calles: values.calles,
								referencia: values.referencia,
								numeroExterior: values.numeroExterior,
								numeroInterior: values.numeroInterior,
								codigoPostal: values.codigoPostal,
								usuarioRegistroID: 1,
								estatus: values.estatus,
							};
							ActionForm({
								variables: { updateId: id, input },
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
											<TextField
												fullWidth
												size="small"
												type="number"
												label="Teléfono"
												name="primerTelefono"
												value={values.primerTelefono}
												onChange={handleChange}
												helperText={touched.primerTelefono && errors.primerTelefono}
												error={touched.primerTelefono && Boolean(errors.primerTelefono)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												size="small"
												type="number"
												label="Segundo Teléfono"
												name="segundoTelefono"
												value={values.segundoTelefono}
												onChange={handleChange}
												helperText={touched.segundoTelefono && errors.segundoTelefono}
												error={touched.segundoTelefono && Boolean(errors.segundoTelefono)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												size="small"
												label="Correo Electronico"
												name="correo"
												value={values.correo}
												onChange={handleChange}
												helperText={touched.correo && errors.correo}
												error={touched.correo && Boolean(errors.correo)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												size="small"
												label="Colonia"
												name="colonia"
												value={values.colonia}
												onChange={handleChange}
												helperText={touched.colonia && errors.colonia}
												error={touched.colonia && Boolean(errors.colonia)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												size="small"
												label="Calles"
												name="calles"
												value={values.calles}
												onChange={handleChange}
												helperText={touched.calles && errors.calles}
												error={touched.calles && Boolean(errors.calles)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												type="number"
												size="small"
												label="Numero Exterior"
												name="numeroExterior"
												value={values.numeroExterior}
												onChange={handleChange}
												helperText={touched.numeroExterior && errors.numeroExterior}
												error={touched.numeroExterior && Boolean(errors.numeroExterior)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												type="number"
												size="small"
												label="Numero Interior"
												name="numeroInterior"
												value={values.numeroInterior}
												onChange={handleChange}
												helperText={touched.numeroInterior && errors.numeroInterior}
												error={touched.numeroInterior && Boolean(errors.numeroInterior)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												type="number"
												size="small"
												label="Codigo Postal"
												name="codigoPostal"
												value={values.codigoPostal}
												onChange={handleChange}
												helperText={touched.codigoPostal && errors.codigoPostal}
												error={touched.codigoPostal && Boolean(errors.codigoPostal)}
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
												type="multiline"
												fullWidth
												label="Referencia de domicilio"
												name="referencia"
												value={values.referencia}
												onChange={handleChange}
												helperText={touched.referencia && errors.referencia}
												error={touched.referencia && Boolean(errors.referencia)}
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
