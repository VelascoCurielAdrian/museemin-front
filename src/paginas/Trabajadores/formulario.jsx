import { Fragment } from 'react';
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import useFormActions from '../../hooks/useFormv2';
import TextField from '../../componentes/TextField';
import { estatus, Generos } from '../../helpers/constants';
import { Header } from '../../componentes/Header/component';
import { SelecField } from '../../componentes/Select/component';
import { TrabajadoresActions, Validate } from '../../actions/trabajadores';

const dataInicial = {
	nombres: '',
	primerApellido: '',
	segundoApellido: '',
	telefono: '',
	correo: '',
	colonia: '',
	referencia: '',
	calles: '',
	numeroExterior: '',
	estatus: '',
	sexo: '',
};

export const Trabajador = () => {
	const { id } = useParams();
	const { save, formRef, values, loading, isLoading, actionForm } = useFormActions({
		method: id ? 'update' : 'create',
		actions: TrabajadoresActions,
		operation: 'getAllTrabajador',
		formData: dataInicial,
		name: 'trabajadores',
		id,
	});

	if (loading) return <div>Cargando...</div>;
	return (
		<Fragment>
			<Header
				name="trabajadores"
				title="Trabajadores"
				subtitle="Moduló de trabajadores"
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
								variables: {
									updateId: id,
									...values,
									telefono: String(values.telefono),
									numeroExterior: String(values.numeroExterior),
								},
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
												label="Nombres"
												name="nombres"
												autoFocus
												value={values.nombres}
												onChange={handleChange}
												helperText={touched.nombres && errors.nombres}
												error={touched.nombres && Boolean(errors.nombres)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												size="small"
												label="Apellido Paterno"
												name="primerApellido"
												value={values.primerApellido}
												onChange={handleChange}
												helperText={touched.primerApellido && errors.primerApellido}
												error={touched.primerApellido && Boolean(errors.primerApellido)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												size="small"
												label="Apellido Materno"
												name="segundoApellido"
												value={values.segundoApellido}
												onChange={handleChange}
												helperText={touched.segundoApellido && errors.segundoApellido}
												error={touched.segundoApellido &&Boolean(errors.segundoApellido)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<SelecField
												fullWidth
												size="small"
												label="Sexo"
												labelProp="nombre"
												name="sexo"
												options={Generos}
												onChange={handleChange}
												value={values.sexo}
												helperText={touched.sexo && errors.sexo}
												error={touched.sexo && Boolean(errors.sexo)}
											/>
										</div>
										<div className="col-span-6 sm:col-span-2">
											<TextField
												fullWidth
												type="number"
												size="small"
												label="Telefono"
												name="telefono"
												value={values.telefono}
												onChange={handleChange}
												helperText={touched.telefono && errors.telefono}
												error={touched.telefono && Boolean(errors.telefono)}
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
												label="Numero Casa"
												name="numeroExterior"
												value={values.numeroExterior}
												onChange={handleChange}
												helperText={touched.numeroExterior && errors.numeroExterior}
												error={touched.numeroExterior && Boolean(errors.numeroExterior)}
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
		</Fragment>
	);
};
