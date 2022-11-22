import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsTools } from 'react-icons/bs';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../../componentes/Button';
import useFormActions from '../../hooks/useForm';
import { ClasificacionActions } from '../../actions';
import { Clasificacion } from '../Clasificacion/formulario';
import { Header } from '../../componentes/Header/component';
import { estadoHerramienta, estatus, filters } from '../../helpers/constants';
import { HerramientasActions, Validate } from '../../actions/herramientas';
import {
	SelectFieldController,
	TextFieldController,
} from '../../componentes/Formulario';

const dataInicial = {
	clasificacionID: '',
	estado: '',
	estatus: true,
	nombre: '',
	marca: '',
	precio: '',
	descripcion: '',
};

export const Herramienta = () => {
	const { id } = useParams();
	const [open, setOpen] = useState(false);
	const [clasificaciones, setClasificaciones] = useState([]);
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
		actions: HerramientasActions,
		operation: 'getAllHerramientas',
		name: 'herramientas',
		reset,
		id,
		redirect: true,
	});

	useQuery(ClasificacionActions.GET, {
		variables: { ...filters },
		onCompleted: (data) => {
			setClasificaciones(data?.getAllCountClasificacion?.rows);
		},
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onSubmit = (data) => {
		actionForm({
			variables: { updateID: id, ...data },
		});
	};

	if (loading) return <div>Cargando...</div>;
	return (
		<>
			<Header
				name="herramientas"
				title="Herramientas"
				subtitle="Moduló de Herramientas"
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
					<form id="herramientas">
						<div className="overflow-hidden shadow sm:rounded-md">
							<div className="bg-white px-4 py-5 sm:p-6">
								<div className="grid grid-cols-8 gap-2">
									<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
										<TextFieldController
											autoFocus
											error={errors.nombre}
											control={control}
											label="Nombre"
											name="nombre"
										/>
									</div>
									<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
										<SelectFieldController
											control={control}
											label="Clasificaciones"
											labelProp="descripcion"
											name="clasificacionID"
											options={clasificaciones}
											error={errors.clasificacionID}
										/>
									</div>
									<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
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
									<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
										<TextFieldController
											error={errors.precio}
											control={control}
											label="precio"
											name="precio"
											type="number"
										/>
									</div>
									<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
										<TextFieldController
											error={errors.marca}
											control={control}
											label="Marca"
											name="marca"
										/>
									</div>
									<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
										<SelectFieldController
											label="Estado de la herramienta"
											labelProp="nombre"
											name="estado"
											control={control}
											options={estadoHerramienta}
											error={errors.estado}
										/>
									</div>
									<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
										<SelectFieldController
											label="Estatus"
											labelProp="nombre"
											name="estatus"
											options={estatus}
											control={control}
											error={errors.estatus}
										/>
									</div>
									<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
										<TextFieldController
											error={errors.descripcion}
											control={control}
											type="multiline"
											label="Descripción"
											name="descripcion"
										/>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</>
			<Clasificacion open={open} handleClose={handleClose} />
		</>
	);
};
