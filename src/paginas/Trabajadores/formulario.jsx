import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import useFormActions from '../../hooks/useFormv2';
import { estatus, Generos } from '../../helpers/constants';
import { Header } from '../../componentes/Header/component';
import { TrabajadoresActions, Validate } from '../../actions/trabajadores';
import {
	SelectFieldController,
	TextFieldController,
} from '../../componentes/Formulario';

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
	estatus: true,
	sexo: '',
};
export const Trabajador = () => {
	const { id } = useParams();
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(Validate),
		defaultValues: dataInicial,
	});

	const { loading, isLoading, actionForm } = useFormActions({
		method: id ? 'update' : 'create',
		actions: TrabajadoresActions,
		operation: 'getAllTrabajador',
		formData: dataInicial,
		name: 'trabajadores',
		reset,
		id,
		redirect: true,
	});

	const onSubmit = (data) => {
		actionForm({
			variables: { updateID: id, ...data },
		});
	};
	if (loading) return <div>Cargando...</div>;
	return (
		<Fragment>
			<Header
				name="trabajadores"
				title="Trabajadores"
				subtitle="Moduló de trabajadores"
				handleCreate={handleSubmit(onSubmit)}
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
					<form id="trabajdores">
						<div className="overflow-hidden shadow sm:rounded-md">
							<div className="bg-white px-4 py-5 sm:p-6">
								<div className="grid grid-cols-6 gap-6">
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											label="Nombres"
											name="nombres"
											autoFocus
											control={control}
											error={errors.nombres}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											label="Apellido Paterno"
											name="primerApellido"
											control={control}
											error={errors.primerApellido}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											label="Apellido Materno"
											name="segundoApellido"
											control={control}
											error={errors.segundoApellido}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<SelectFieldController
											label="Sexo"
											labelProp="nombre"
											name="sexo"
											options={Generos}
											control={control}
											error={errors.sexo}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											type="number"
											label="Telefono"
											name="telefono"
											control={control}
											error={errors.telefono}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											label="Correo Electronico"
											name="correo"
											control={control}
											error={errors.correo}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											label="Colonia"
											name="colonia"
											control={control}
											error={errors.colonia}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											label="Calles"
											name="calles"
											control={control}
											error={errors.calles}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											type="number"
											label="Numero exterior"
											name="numeroExterior"
											control={control}
											error={errors.numeroExterior}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<SelectFieldController
											label="Estatus"
											labelProp="nombre"
											name="estatus"
											options={estatus}
											control={control}
											error={errors.estatus}
										/>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<TextFieldController
											control={control}
											type="multiline"
											label="Referencia de domicilio"
											name="referencia"
											error={errors.referencia}
										/>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</>
		</Fragment>
	);
};
