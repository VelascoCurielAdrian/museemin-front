import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { MdAddShoppingCart } from 'react-icons/md';
import { Checkbox, FormControlLabel, Grow, Box } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { ClientesActions } from '../../actions/clientes';
import { TrabajadoresActions } from '../../actions/trabajadores';
import { filters, tiposMetodoPago } from '../../helpers/constants';
import { Header } from '../../componentes/Header/component';
import SelecField from '../../componentes/Select/component';
import TextField from '../../componentes/TextField';
import TextField2 from '../../componentes/TextField/componentv2';
import { TablaArticulos } from './tablaArticulos';
import Button from '../../componentes/Button';
import { GastosActions } from '../../actions/gastos';
import { parseError } from '../../helpers';
import { toast } from 'react-toastify';

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

export const Gasto = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [tipoGasto, setTipoGasto] = useState({ interno: false, externo: true });
	const [formData, setFormData] = useState({ ...dataInicial });
	const [trabajadores, setTrabajadores] = useState([]);
	const [detalleGasto, setDetalleGasto] = useState([]);
	const [clientes, setClientes] = useState([]);

	const [getById, { loading }] = useLazyQuery(GastosActions.GET_BYID, {
		fetchPolicy: 'no-cache',
		onCompleted: (response) => {
			const { DetalleGastos, tipoGasto } = Object.values(response)[0];
			if (tipoGasto === 2) setTipoGasto({ interno: true });
			setFormData(Object.values(response)[0]);
			setDetalleGasto(DetalleGastos);
		},
	});
	const endpoint = id ? GastosActions.UPDATE : GastosActions.CREATE;
	const [actionForm, { loading: isLoading }] = useMutation(endpoint, {
		update: (cache, { data: response }) => {
			try {
				if (id) return false;
				const dataResponse = response[Object.keys(response)[0]];
				console.log(dataResponse);
				const oldQuery = cache.readQuery({
					query: GastosActions.GET,
					variables: { offset: null, limit: null, txtBusqueda: '' },
				});
				cache.writeQuery({
					query: GastosActions.GET,
					variables: { offset: null, limit: null, txtBusqueda: '' },
					data: {
						['getAllGastos']: {
							...oldQuery['getAllGastos'],
							count: oldQuery['getAllGastos'].count + 1,
							rows: [dataResponse.respuesta, ...oldQuery['getAllGastos'].rows],
						},
					},
				});
			} catch (error) {
				return error;
			}
		},
		onCompleted: (response) => {
			toast.success(Object.values(response)[0].mensaje);
			navigate(`/gastos`, {
				replace: true,
			});
		},
		onError: (e) => {
			const parseErrors = parseError(e);
			parseErrors.forEach(({ message, name }) => {
				if (name === 'BAD_USER_INPUT') {
					toast.error(`${Object.values(message)}`);
				}
			});
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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleChangeDate = (value) => {
		const fecha = format(value, "yyyy-MM-dd'T'HH:mm:ss.SSS");
		setFormData({ ...formData, fecha });
	};

	const handleChangeTipoGasto = (e) => {
		const { name } = e.target;
		setTipoGasto({ [name]: e.target.checked });
	};

	const handleArticulos = (dataArticulos) => {
		let subTotal = 0;
		dataArticulos.forEach((articulo) => {
			subTotal += articulo.precio * articulo.cantidad;
		});
		formData.subTotal = parseFloat(subTotal).toFixed(2);
		setDetalleGasto(dataArticulos);
		setFormData({ ...formData });
	};

	useEffect(() => {
		const { importe, diferencia, subTotal } = formData;
		formData.total =
			parseFloat(importe) - parseFloat(subTotal) + parseFloat(diferencia);
		setFormData({ ...formData });
	}, [formData.diferencia, formData.subTotal, formData.importe]);

	const handleAddArticulo = () => {
		setDetalleGasto([...detalleGasto, { ...nuevoArticulo }]);
	};

	const handleSubmit = async () => {
		const DetalleGastos = detalleGasto.map((gasto) => {
			delete gasto.__typename;
			return {
				...gasto,
				precio: parseFloat(gasto.precio),
				cantidad: parseInt(gasto.cantidad),
				precioParcial: parseFloat(gasto.precioParcial),
			};
		});

		const gasto = tipoGasto.externo ? 1 : 2;

		await actionForm({
			variables: {
				...formData,
				tipoGasto: gasto,
				subTotal: parseFloat(formData.subTotal),
				importe: parseFloat(formData.importe),
				diferencia: parseFloat(formData.diferencia),
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
				handleCreate={handleSubmit}
				loading={isLoading}
				agregar
			/>
			<div className="hidden sm:block" aria-hidden="true">
				<div className="py-1">
					<div className="border-t border-gray-200" />
				</div>
			</div>
			<div className="mt-1 md:col-span-2 md:mt-0">
				<form>
					<div className="overflow-hidden shadow sm:rounded-md">
						<div className="bg-white px-4 py-5 sm:p-6">
							<div className="grid grid-cols-8 gap-2">
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
									<SelecField
										fullWidth
										required
										size="small"
										labelProp="nombres"
										name="trabajadorID"
										label="Trabajador"
										options={trabajadores}
										onChange={handleChange}
										value={formData.trabajadorID}
										customLabel={(option) =>
											`${option.nombres} ${option.primerApellido} ${option.segundoApellido}`
										}
									/>
								</div>
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
									<MobileDatePicker
										value={formData.fecha}
										name="fecha"
										onChange={handleChangeDate}
										renderInput={(params) => (
											<TextField
												required
												{...params}
												size="small"
												fullWidth
												name="fecha"
												label="Fecha de la compra"
												value={params.inputProps.value}
											/>
										)}
									/>
								</div>
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
									{/* <TextField
										fullWidth
										required
										size="small"
										label="Local o empresa de compra"
										name="compania"
										value={formData.compania}
										onChange={handleChange}
									/> */}
									<TextField2
										onChange={setFormData}
										isHandleChange
										value={formData.compania}
										title="Local o empresa de compra"
										name="compania"
									/>
								</div>
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
									<SelecField
										fullWidth
										required
										size="small"
										labelProp="nombre"
										name="metodoPago"
										label="Metodo de pago"
										options={tiposMetodoPago}
										onChange={handleChange}
										value={formData.metodoPago}
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
										data={detalleGasto}
										onChange={handleArticulos}
									/>
									<div className="grid grid-cols-12 gap-2">
										<div className="col-span-12 lg:col-span-6 md:col-span-12 sm:col-span-12 space-y-2">
											<Button
												disabled={
													formData.diferencia === '' || formData.importe === ''
												}
												size="medium"
												label="Agregar Articulo"
												onClick={handleAddArticulo}
												icono={<MdAddShoppingCart size={16} />}
											/>
											<TextField
												fullWidth
												required
												type="multiline"
												name="descripcion"
												label="Comentarios"
												value={formData.descripcion}
												onChange={handleChange}
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
														${formData.subTotal || '0.00'}
													</dd>
												</div>
												<div className="border-t border-gray-300" />
												<div className="bg-white px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-1">
													<dt className="text-sm font-bold text-gray-500">
														Importe
													</dt>
													<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-20">
														${formData.importe || '0.00'}
													</dd>
												</div>
												<div className="border-t border-gray-300" />
												<div className="bg-white px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-1">
													<dt className="text-sm font-bold text-gray-500">
														Importe del trabajador
													</dt>
													<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-20">
														${formData.diferencia || '0.00'}
													</dd>
												</div>
												<div className="border-t border-gray-300" />
												<div className="bg-white px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-1">
													<dt className="text-sm font-bold text-gray-500">
														Total
													</dt>
													<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-20">
														${formData.total || '0.00'}
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
												{...(tipoGasto.externo ? { timeout: 1000 } : {})}
											>
												<div style={{ width: '100%' }}>
													<SelecField
														fullWidth
														size="small"
														name="clienteID"
														labelProp="nombre"
														label="Cliente dirigido"
														options={clientes}
														onChange={handleChange}
														value={formData.clienteID || ''}
													/>
												</div>
											</Grow>
										</Box>
									</Box>
									<TextField
										required
										fullWidth
										size="small"
										type="number"
										name="importe"
										label="Importe"
										value={formData.importe}
										onChange={handleChange}
									/>
									<TextField
										required
										fullWidth
										type="number"
										size="small"
										label="Importe del trabajador"
										name="diferencia"
										value={formData.diferencia}
										onChange={handleChange}
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
