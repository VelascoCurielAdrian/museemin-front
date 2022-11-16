import { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { Checkbox, FormControlLabel, Grow, Box } from '@mui/material';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdAddShoppingCart } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

import { GastosActions, ValidacionGasto } from '../../actions/gastos';
import { filters, tiposMetodoPago } from '../../helpers/constants';
import { TrabajadoresActions } from '../../actions/trabajadores';
import { Header } from '../../componentes/Header/component';
import { ClientesActions } from '../../actions/clientes';
import useFormActions from '../../hooks/useFormv2';
import Button from '../../componentes/Button';
import TablaArticulos from './tablaArticulos';
import {
	DatePickerController,
	SelectFieldController,
	TextFieldController,
} from '../../componentes/Formulario';


const dataInicial = {
	trabajadorID: '',
	fecha: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
	clienteID: '',
	compania: '',
	metodoPago: '',
	importe: '',
	diferencia: '',
	total: '',
	subTotal: '',
	descripcion: '',
};

const nuevoArticulo = {
	descripcion: '',
	precio: '',
	unidad: '',
	cantidad: '',
	precioParcial: '',
	activo: true,
};

const getTotal = ({ diferencia, subTotal, importe, setValue }) => {
	const total =
		parseFloat(importe) - parseFloat(subTotal) + parseFloat(diferencia);
	setValue('total', total);
	return total;
};

const TotalGasto = ({ subTotal, diferencia, importe, setValue }) => {
	return (
		<p>${getTotal({ subTotal, diferencia, importe, setValue }) || '0.00'}</p>
	);
};

export const Gasto = () => {
	const { id } = useParams();
	const [tipoGasto, setTipoGasto] = useState({ interno: false, externo: true });
	const [trabajadores, setTrabajadores] = useState([]);
	const [clientes, setClientes] = useState([]);

	const {
		reset,
		control,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(ValidacionGasto),
		defaultValues: dataInicial,
	});
	const { fields, append, replace, remove } = useFieldArray({
		control,
		name: 'articulos',
	});

	const { isLoading, actionForm } = useFormActions({
		method: id ? 'update' : 'create',
		operation: 'getAllGastos',
		actions: GastosActions,
		formData: dataInicial,
		setValues: false,
		redirect: true,
		name: 'gastos',
		reset,
		id,
	});

	const articulos = useWatch({ control, name: 'articulos' });
	const subTotal = useWatch({ control, name: 'subTotal' });
	const diferencia = useWatch({ control, name: 'diferencia' });
	const importe = useWatch({ control, name: 'importe' });

	const [getById, { loading }] = useLazyQuery(GastosActions.GET_BYID, {
		fetchPolicy: 'no-cache',
		onCompleted: (response) => {
			const values = Object.values(response)[0];
			const { DetalleGastos, tipoGasto } = values;
			if (tipoGasto === 2) setTipoGasto({ interno: true });
			reset(values);
			replace(DetalleGastos);
		},
	});

	useEffect(() => {
		id && getById({ variables: { id } });
	}, [id]);

	useQuery(TrabajadoresActions.GET, {
		variables: { ...filters },
		onCompleted: (data) => {
			setTrabajadores(data.getAllTrabajador?.rows);
		},
	});

	useQuery(ClientesActions.GET, {
		variables: { ...filters },
		onCompleted: (data) => {
			setClientes(data.getAllCliente?.rows);
		},
	});

	const handleChangeTipoGasto = (e) => {
		const { name } = e.target;
		setTipoGasto({ [name]: e.target.checked });
	};

	const onSubmit = (data) => {
		if (
			fields.length === 0 ||
			articulos.filter(({ activo }) => activo).length === 0
		) {
			return toast.warning('Es necesario agregar artículos.');
		}

		const DetalleGastos = articulos.map((gasto) => {
			delete gasto.__typename;
			return {
				...gasto,
				precio: parseFloat(gasto.precio),
				cantidad: parseInt(gasto.cantidad),
				precioParcial: parseInt(gasto.precioParcial),
			};
		});

		const gasto = tipoGasto.externo ? 1 : 2;

		actionForm({
			variables: {
				...data,
				tipoGasto: gasto,
				updateID: id,
				CapturaDetalleGastos: DetalleGastos,
			},
		});
	};

	if (loading) return <h1>...Cargando</h1>;

	return (
		<>
			<Header
				title="Gastos"
				name="gastos"
				subtitle="Moduló de gastos internos y externos"
				handleCreate={handleSubmit(onSubmit)}
				isLoading={isLoading}
				agregar
			/>
			<div className="hidden sm:block" aria-hidden="true">
				<div className="py-1">
					<div className="border-t border-gray-200" />
				</div>
			</div>
			<div className="mt-1 md:col-span-2 md:mt-0">
				<form id="formGasto">
					<div className="overflow-hidden shadow sm:rounded-md">
						<div className="bg-white px-4 py-5 sm:p-6">
							<div className="grid grid-cols-8 gap-2">
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
									<SelectFieldController
										control={control}
										label="Trabajador"
										name="trabajadorID"
										labelProp="nombres"
										options={trabajadores}
										error={errors.trabajadorID}
										customLabel={(option) =>
											`${option.nombres} ${option.primerApellido} ${option.segundoApellido}`
										}
									/>
								</div>
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
									<DatePickerController
										name="fecha"
										control={control}
										label="Fecha de compra"
									/>
								</div>
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
									<TextFieldController
										control={control}
										name="compania"
										error={errors.compania}
										label="Local o empresa de compra"
									/>
								</div>
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
									<SelectFieldController
										control={control}
										label="Metodo de pago"
										name="metodoPago"
										labelProp="nombre"
										options={tiposMetodoPago}
										error={errors.metodoPago}
									/>
								</div>
								<div className="col-span-12 lg:col-span-6 md:col-span-12 sm:col-span-12 space-y-2">
									<label
										htmlFor="detalleGastos"
										className="block text-sm mb-1 font-bold text-primary"
									>
										Detalle de los gastos
									</label>
									<TablaArticulos
										setValue={setValue}
										data={fields.filter(({ activo }) => activo) || []}
										errors={errors}
										control={control}
										remove={remove}
									/>
									<div className="grid grid-cols-12 gap-2">
										<div className="col-span-12 lg:col-span-6 md:col-span-12 sm:col-span-12 space-y-2">
											<Button
												size="medium"
												label="Agregar Articulo"
												onClick={() =>
													append({
														...nuevoArticulo,
													})
												}
												disabled={diferencia === '' || importe === ''}
												icono={<MdAddShoppingCart size={16} />}
											/>
											<TextFieldController
												control={control}
												type="multiline"
												name="descripcion"
												error={errors.descripcion}
												label="Comentarios"
											/>
										</div>
										<div className="col-span-12 lg:col-span-6 md:col-span-12 sm:col-span-12 space-y-2">
											<dl>
												<label
													htmlFor="detalleGastos"
													className="block text-sm mb-1 font-bold text-primary"
												>
													Detalle de los gastos
												</label>
												<div className="bg-white px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-1">
													<dt className="text-sm font-bold text-gray-500">
														Sub Total
													</dt>
													<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-20">
														${subTotal || '0.00'}
													</dd>
												</div>
												<div className="border-t border-gray-300" />
												<div className="bg-white px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-1">
													<dt className="text-sm font-bold text-gray-500">
														Importe
													</dt>
													<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-20">
														${importe || '0.00'}
													</dd>
												</div>
												<div className="border-t border-gray-300" />
												<div className="bg-white px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-1">
													<dt className="text-sm font-bold text-gray-500">
														Importe del trabajador
													</dt>
													<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-20">
														${diferencia || '0.00'}
													</dd>
												</div>
												<div className="border-t border-gray-300" />
												<div className="bg-white px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-1">
													<dt className="text-sm font-bold text-gray-500">
														Total
													</dt>
													<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-20">
														<TotalGasto
															subTotal={subTotal}
															importe={importe}
															diferencia={diferencia}
															setValue={setValue}
														/>
													</dd>
												</div>
											</dl>
										</div>
									</div>
								</div>
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
									<label
										htmlFor="detalleGastos"
										className="block text-sm mb-1 font-bold text-primary"
									>
										Tipo de gasto
									</label>
									<div style={{ display: 'flex' }}>
										<FormControlLabel
											control={
												<Checkbox
													name="externo"
													onChange={handleChangeTipoGasto}
													checked={!!tipoGasto.externo}
												/>
											}
											label="Externo"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="interno"
													onChange={handleChangeTipoGasto}
													checked={!!tipoGasto.interno}
												/>
											}
											label="Interno"
										/>
									</div>
									<Box sx={{ height: tipoGasto.externo ? 80 : 2 }}>
										<Box sx={{ display: 'flex' }}>
											<Grow
												in={tipoGasto.externo}
												style={{ transformOrigin: '0 0 0' }}
												{...(tipoGasto.externo ? { timeout: 1500 } : {})}
											>
												<div style={{ width: '100%' }}>
													<SelectFieldController
														control={control}
														label="Cliente dirigido"
														name="clienteID"
														labelProp="nombre"
														options={clientes}
														error={errors.clienteID}
													/>
												</div>
											</Grow>
										</Box>
									</Box>
									<TextFieldController
										control={control}
										name="importe"
										error={errors.importe}
										label="Importe"
										type="number"
									/>
									<TextFieldController
										control={control}
										name="diferencia"
										error={errors.diferencia}
										label="Importe del trabajador"
										type="number"
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
