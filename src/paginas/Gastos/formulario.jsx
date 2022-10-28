import { useState, useRef, Fragment, useEffect } from 'react';
import { Formik } from 'formik';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { MdAddShoppingCart, MdCancel } from 'react-icons/md';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { 
	IconButton, Paper, Table, TableBody, TableCell, 
	TableContainer, TableHead, TableRow, Tooltip
} from '@mui/material';

import Button from '../../componentes/Button';
import useFormActions from '../../hooks/useFormv2';
import TextField from '../../componentes/TextField';
import { metodoPago } from '../../helpers/constants';
import { ClientesActions } from '../../actions/clientes';
import { Header } from '../../componentes/Header/component';
import { GastosActions, Validate } from '../../actions/gastos';
import { SelecField } from '../../componentes/Select/component';
import { TrabajadoresActions } from '../../actions/trabajadores';

const dataInicial = {
	trabajadorID: '',
	clienteID: '',
	compania: '',
	metodoPago: '',
	importe: '',
	diferencia: '',
	total: 0,
	descripcion: '',
};

const articuloNuevo = {
	id: '',
	descripcion: '',
	precio: '',
	cantidad: '',
};

export const Gasto = () => {
	const { id } = useParams();
	const idArticulo = useRef(0);
	const [total, setTotal] = useState('');
	const [importe, setImporte] = useState('');
	const [trabajadores, setTrabajadores] = useState([]);
	const [clientes, setClientes] = useState([]);
	const [articulos, setArticulos] = useState([]);
	const [fechaRigistro, setFecha] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS"));
	const [subtotalVenta, setSubtotal] = useState('');
	const [diferencia, setDiferencia] = useState('');

	const { save, formRef, values, loading, isLoading, actionForm  } = useFormActions({
		method: idArticulo ? 'update' : 'create',
		actions: GastosActions,
		operation: 'getAllGastos',
		formData: dataInicial,
		name: 'gastos',
		id,
	});
	console.log(values);

  useQuery(TrabajadoresActions.GET, {
		variables: {
			offset: null,
			limit: null,
			txtBusqueda: '',
		},
    onCompleted: data => {
      setTrabajadores(data?.getAllTrabajador?.rows);
    },
  });

  useQuery(ClientesActions.GET, {
		variables: {
			offset: null,
			limit: null,
			txtBusqueda: '',
		},
    onCompleted: data => {
      setClientes(data?.getAllCliente?.rows);
    },
  });

	const addProducto = () => {
		articuloNuevo.id = ++idArticulo.current;
		setArticulos([...articulos, { ...articuloNuevo }]);
	};

	const removeProducto = (e, id) => {
		setArticulos(articulos.filter((p) => p.id != id));
	};

	const handleChangeArticulos = (e, id) => {
		const { name, value } = e.target;
		setArticulos(
			articulos.map((p) => (p.id == id ? { ...p, [name]: value } : p)),
		);
	};

	useEffect(() => {
		let subtotal = 0;
		articulos.map((el) => (subtotal += parseFloat(el.cantidad) * parseFloat(el.precio)));
		setTotal(parseFloat(importe || 0) - parseFloat(subtotal || 0) + parseFloat(diferencia));
	}, [articulos, diferencia, importe]);

	useEffect(() => {
		let subtotal = 0;
		articulos.map((el) => (subtotal += parseFloat(el.cantidad) * parseFloat(el.precio)));
		setSubtotal(parseFloat(subtotal || 0));
	}, [articulos]);

	if (loading) return <div>Cargando...</div>;
	return (
		<>
			<Header
				title="Gastos"
				name="gastos"
				subtitle="Moduló de gastos internos"
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
					<Formik						noValidate
						innerRef={formRef}
						initialValues={values}
						validationSchema={Validate}
						onSubmit={(values) => {
							if (articulos.length === 0) {
								toast.error('Debe Agregar al menos un articulo');
								return null;
							}
							const input = {
								compania: values.compania,
								fecha: fechaRigistro,
								metodoPago: values.metodoPago,
								importe: parseFloat(importe),
								diferencia: parseFloat(diferencia),
								subtotal: parseFloat(subtotalVenta),
								total: parseFloat(total),
								usuarioRegistroID: 1,
								CapturaDetalleGastos: articulos,
								trabajadorID: values.trabajadorID,
								clienteID: values.clienteID,
								descripcion: values.descripcion,
							};
							actionForm({ variables: { input } });
						}}
					>
						{({ handleChange, values, touched, errors }) => (
							<div className="overflow-hidden shadow sm:rounded-md">
								<div className="bg-white px-4 py-5 sm:p-6">
									<div className="grid grid-cols-8 gap-2">
										<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
											<SelecField
												fullWidth
												size="small"
												labelProp="nombres"
												name="trabajadorID"
												label="Trabajador"
												options={trabajadores}
												onChange={handleChange}
												value={values.trabajadorID}
												helperText={touched.trabajadorID && errors.trabajadorID}
												error={touched.trabajadorID && Boolean(errors.trabajadorID)}
												customLabel={(option) => `${option.nombres} ${option.primerApellido} ${option.segundoApellido}`}
											/>
										</div>
										<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
											<MobileDatePicker
												value={fechaRigistro}
												onChange={(newValue) => setFecha(newValue)}
												renderInput={(params) => (
													<TextField
														{...params}
														size="small"
														fullWidth
														label="Fecha de la compra"
														value={params.inputProps.value}
													/>
												)}
											/>
										</div>
										<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
											<TextField
												fullWidth
												size="small"
												label="Local o empresa de compra"
												name="compania"
												value={values.compania}
												onChange={handleChange}
												helperText={touched.compania && errors.compania}
												error={touched.compania && Boolean(errors.compania)}
											/>
										</div>
										<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
											<SelecField
												fullWidth
												size="small"
												labelProp="nombre"
												name="metodoPago"
												label="Metodo de pago"
												options={metodoPago}
												onChange={handleChange}
												value={values.metodoPago}
												helperText={touched.metodoPago && errors.metodoPago}
												error={touched.metodoPago && Boolean(errors.metodoPago)}
											/>
										</div>

										<div className="col-span-12 lg:col-span-6 md:col-span-12 sm:col-span-12 space-y-2">
											<TableContainer component={Paper} sx={{ maxHeight: 340 }}>
												<Table
													sx={{ width: '100%' }}
													stickyHeader
													aria-label="sticky table"
												>
													<TableHead>
														<TableRow>
															<TableCell>NOMBRE</TableCell>
															<TableCell>PRECIO</TableCell>
															<TableCell>CANTIDAD</TableCell>
															<TableCell>ACCIÓN</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{articulos?.map((producto, index) => (
															<TableRow key={producto.id}>
																<TableCell>
																	<TextField
																		name="descripcion"
																		value={producto.descripcion}
																		fullWidth
																		size="small"
																		onChange={(e) => handleChangeArticulos(e, producto.id)}
																	/>
																</TableCell>
																<TableCell>
																	<TextField
																		name="precio"
																		type="number"
																		value={producto.precio}
																		fullWidth
																		size="small"
																		onChange={(e) => handleChangeArticulos(e, producto.id)}
																	/>
																</TableCell>
																<TableCell>
																	<TextField
																		name="cantidad"
																		type="number"
																		value={producto.cantidad}
																		fullWidth
																		size="small"
																		onChange={(e) => handleChangeArticulos(e, producto.id)}
																	/>
																</TableCell>
																<TableCell>
																	<Fragment>
																		<Tooltip
																			title="Eliminar"
																			placement="bottom-end"
																			arrow
																			onClick={(e) =>
																				removeProducto(e, producto.id)
																			}
																		>
																			<IconButton>
																				<MdCancel
																					size={20}
																					className="text-red-600"
																				/>
																			</IconButton>
																		</Tooltip>
																	</Fragment>
																</TableCell>
															</TableRow>
														))}
													</TableBody>
												</Table>
											</TableContainer>
											<div className="flex">
												<Button
													size="medium"
													label="Agregar Articulo"
													onClick={addProducto}
													icono={<MdAddShoppingCart size={16} />}
												/>
												<h6 className="ext-1xl ml-auto mt-4 font-bold tracking-tight text-green-900">
													Sub Total: $
													<label className="text-sm m-2 font-medium text-gray-700">
														{subtotalVenta || '0'}
													</label>
												</h6>
											</div>
											<TextField
												fullWidth
												type="multiline"
												name="descripcion"
												label="Comentarios"
												value={values.descripcion}
												onChange={handleChange}
												helperText={touched.descripcion && errors.descripcion}
												error={touched.descripcion && Boolean(errors.descripcion)}
											/>
										</div>
										<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
											<SelecField
												fullWidth
												size="small"
												name="clienteID"
												labelProp="nombre"
												label="Cliente dirigido"
												options={clientes}
												onChange={handleChange}
												value={values.clienteID}
												helperText={touched.clienteID && errors.clienteID}
												error={touched.clienteID && Boolean(errors.clienteID)}
											/>
											<TextField
												fullWidth
												size="small"
												type="number"
												name="importe"
												label="Importe"
												value={values.importe}
												onChange={(e) => {
													handleChange(e);
													setImporte(e.target.value);
												}}
												helperText={touched.importe && errors.importe}
												error={touched.importe && Boolean(errors.importe)}
											/>
											<TextField
												fullWidth
												type="number"
												size="small"
												label="Diferencia"
												name="diferencia"
												value={values.diferencia}
												onChange={(e) => {
													handleChange(e);
													setDiferencia(e.target.value);
												}}
												helperText={touched.diferencia && errors.diferencia}
												error={touched.diferencia && Boolean(errors.diferencia)}
											/>
											<h6
												className={`text-1xl m-2 font-bold tracking-tight ${
													total > 0 ? 'text-green-900' : 'text-red-500'
												}`}
											>
												Total: $
												<label className="text-sm m-2 font-medium text-gray-700">
													{total === 0 ? diferencia : total || '0'}
												</label>
											</h6>
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
