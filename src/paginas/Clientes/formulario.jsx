import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from '../../componentes/Header/component';
import { ClientesActions, Validate } from '../../actions/clientes';
import { estatus } from '../../helpers/constants';
import useFormActions from '../../hooks/useFormv2';
import {
	SelectFieldController,
	TextFieldController,
} from '../../componentes/Formulario';

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
	estatus: true,
};

export const Cliente = () => {
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
		actions: ClientesActions,
		operation: 'getAllCliente',
		name: 'clientes',
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
		<>
			<Header
				name="clientes"
				title="Clientes"
				subtitle="Moduló de clientes"
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
					<form id="clientes">
						<div className="overflow-hidden shadow sm:rounded-md">
							<div className="bg-white px-4 py-5 sm:p-6">
								<div className="grid grid-cols-6 gap-6">
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											control={control}
											label="Nombre"
											name="nombre"
											autoFocus
											error={errors.nombre}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											control={control}
											type="number"
											label="Primer Teléfono"
											name="primerTelefono"
											error={errors.primerTelefono}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											control={control}
											type="number"
											label="Primer Teléfono"
											name="segundoTelefono"
											error={errors.segundoTelefono}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											control={control}
											label="Correo Electronico"
											name="correo"
											error={errors.correo}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											control={control}
											label="Colonia"
											name="colonia"
											error={errors.colonia}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											control={control}
											label="Calles"
											name="calles"
											error={errors.calles}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											type="number"
											control={control}
											label="Numero Exterior"
											name="numeroExterior"
											error={errors.numeroExterior}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											type="number"
											control={control}
											label="Numero Interior"
											name="numeroInterior"
											error={errors.numeroInterior}
										/>
									</div>
									<div className="col-span-6 sm:col-span-2">
										<TextFieldController
											type="number"
											control={control}
											label="Codigo Postal"
											name="codigoPostal"
											error={errors.codigoPostal}
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
		</>
	);
};
