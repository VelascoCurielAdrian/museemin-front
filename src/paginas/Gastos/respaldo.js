import { useState, useRef, Fragment } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { MdAddShoppingCart, MdCancel } from 'react-icons/md';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import Button from '../../componentes/Button';
import TextField from '../../componentes/TextField';
import { Header } from '../../componentes/Header/component';
import { SelecField } from '../../componentes/Select/component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import 'moment/locale/es';
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
} from '@mui/material';
import { metodoPago } from '../../helpers/constants';
import { useQuery } from '@apollo/client';
import { TrabajadoresActions } from '../../actions/trabajadores';
import { useEffect } from 'react';
import { GastosActions, Validate } from '../../actions/gastos';
import { ClientesActions } from '../../actions/clientes';
import { toast } from 'react-toastify';
import useFormActions from '../../hooks/useFormv2';

const doc = new jsPDF();
moment.locale('es');

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

const articulo = {
	id: '',
	descripcion: '',
	precio: '',
	cantidad: '',
};

export const Gasto = () => {
	const navigate = useNavigate();
	const [fechaRigistro, setFecha] = useState(null);
	const [total, setTotal] = useState('');
	const [subtotalVenta, setSubtotal] = useState('');
	const [importe, setImporte] = useState('');
	const [diferencia, setDif] = useState('');
	const id = useRef(0);
	const [articulos, setArticulos] = useState([]);

	const { actionForm } = useFormActions({
		method: id ? 'update' : 'create',
		actions: GastosActions,
		operation: 'getAllGastos',
		formData: dataInicial,
		name: 'gastos',
	});

	const { data } = useQuery(TrabajadoresActions.GET, {
		variables: {
			offset: null,
			limit: null,
			txtBusqueda: '',
		},
	});

	const { data: clientes } = useQuery(ClientesActions.GET, {
		variables: {
			offset: null,
			limit: null,
			txtBusqueda: '',
		},
	});

	const addProducto = () => {
		articulo.id = ++id.current;
		setArticulos([...articulos, articulo]);
	};

	const removeProducto = (e, id) => {
		setArticulos(articulos.filter((p) => p.id != id));
	};

	const handleChange = (e, id) => {
		const { name, value } = e.target;
		setArticulos(
			articulos.map((p) => (p.id == id ? { ...p, [name]: value } : p)),
		);
	};

	useEffect(() => {
		let subtotal = 0;
		articulos.map(
			(el) => (subtotal += parseFloat(el.cantidad) * parseFloat(el.precio)),
		);
		setTotal(
			parseFloat(importe || 0) -
				parseFloat(subtotal || 0) +
				parseFloat(diferencia),
		);
	}, [articulos, diferencia, importe]);

	useEffect(() => {
		let subtotal = 0;
		articulos.map(
			(el) => (subtotal += parseFloat(el.cantidad) * parseFloat(el.precio)),
		);
		setSubtotal(parseFloat(subtotal || 0));
	}, [articulos]);

	const handleBack = () => {
		navigate('/servicios', {
			replace: true,
		});
	};

	const formik = useFormik({
		initialValues: dataInicial,
		validationSchema: Validate,
		onSubmit: (values) => {
			if (articulos.length === 0) {
				toast.error('Debe Agregar al menos un articulo');
				return null;
			}
			if (importe === '' || diferencia === '') {
				toast.error('El importe y la diferencia son obligatorios');
				return null;
			}
			const input = {
				compania: values.compania,
				fecha: new Date(),
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
			navigate(`/gastos`, {
				replace: true,
			});
		},
	});

	const generatePDf = () => {
		doc.setFont('helvetica');
		doc.setFontSize(15);
		doc.text(15, 10, 'Ferreteria Trupper.');

		doc.setFont('helvetica');
		doc.setFontSize(10);
		doc.text(15, 16, `Adrian Velasco Curiel`);
		doc.setFontSize(10);
		doc.setFont('helvetica');
		doc.setFontSize(10);
		doc.text(15, 30, `Razón Social: Trupper Barrancos`);
		doc.setFontSize(10);
		doc.text(125, 16, `Fecha: ${moment(new Date()).format('LLLL')}`);

		doc.setTextColor(0);

		autoTable(doc, { html: '#my-table' });
		autoTable(doc, {
			head: [['CONCEPTO', 'PRECIO', 'UNIDADES', 'SUBTOTAL', 'IVA', 'TOTAL']],
			body: [
				['Gafas de protección', '90.00', '1', '90', '10%', '100'],
				['Guantes de carnaza', '90.00', '2', '90', '10%', '100'],
				['Discos de corte para amoladora', '10.00', '5', '50', '10%', '100'],
				['Disco de corte 7 pulgadas', '40.00', '4', '160', '10%', '100'],
				['Carda de 3/4', '105.00', '1', '90', '10%', '120'],
				['Soldadura 1/8 60/13', '160.00', '1', '160', '10%', '170'],
				['Careta de soldador', '490.00', '1', '490', '10%', '500'],
				['Conchas de ruido', '190.00', '1', '190', '10%', '200'],
			],
		});
		doc.text(160, 100, `Total: $ 1390.00`);
		doc.setFontSize(10);

		doc.save(`Gastos${moment(new Date()).format('LLLL')}.pdf`);
	};

	return (
		<>
			<Header
				title="Gastos"
				name="gastos"
				subtitle="Moduló de gastos internos"
				handleCancelar={handleBack}
				handleCreate={formik.handleSubmit}
				handlePrint={generatePDf}
				agregar
				print
			/>
			<>
				<div className="hidden sm:block" aria-hidden="true">
					<div className="py-5">
						<div className="border-t border-gray-200" />
					</div>
				</div>

				<div className="mt-5 md:col-span-2 md:mt-0">
					<form noValidate>
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
											options={data?.getAllTrabajador?.rows || []}
											onChange={formik.handleChange}
											value={formik.values.trabajadorID}
											helperText={formik.touched.trabajadorID && formik.errors.trabajadorID}
											error={formik.touched.trabajadorID && Boolean(formik.errors.trabajadorID)}
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
													placeHolder={`${moment(new Date()).format('LLL')}`}
												/>
											)}
										/>
									</div>
									<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
										<TextField
											fullWidth
											size="small"
											label="Empresa"
											name="compania"
											value={formik.values.compania}
											onChange={formik.handleChange}
											helperText={formik.touched.compania && formik.errors.compania}
											error={formik.touched.compania && Boolean(formik.errors.compania)}
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
											onChange={formik.handleChange}
											value={formik.values.metodoPago}
											helperText={formik.touched.metodoPago && formik.errors.metodoPago}
											error={formik.touched.metodoPago && Boolean(formik.errors.metodoPago)}
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
																	onChange={(e) => handleChange(e, producto.id)}
																/>
															</TableCell>
															<TableCell>
																<TextField
																	name="precio"
																	type="number"
																	value={producto.precio}
																	fullWidth
																	size="small"
																	onChange={(e) => handleChange(e, producto.id)}
																/>
															</TableCell>
															<TableCell>
																<TextField
																	name="cantidad"
																	type="number"
																	value={producto.cantidad}
																	fullWidth
																	size="small"
																	onChange={(e) => handleChange(e, producto.id)}
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
												onClick={addProducto}
												label="Agregar Articulo"
												size="medium"
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
											type="multiline"
											label="Comentarios"
											fullWidth
											name="descripcion"
											value={formik.values.descripcion}
											onChange={formik.handleChange}
											helperText={formik.touched.descripcion && formik.errors.descripcion}
											error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
										/>
									</div>
									<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
										<SelecField
											fullWidth
											size="small"
											labelProp="nombre"
											name="clienteID"
											label="Cliente dirigido"
											options={clientes?.getAllCliente?.rows || []}
											onChange={formik.handleChange}
											value={formik.values.clienteID}
											helperText={formik.touched.clienteID && formik.errors.clienteID}
											error={formik.touched.clienteID && Boolean(formik.errors.clienteID)}
										/>
										<TextField
											fullWidth
											type="number"
											size="small"
											label="Importe"
											name="importe"
											value={importe}
											onChange={(e) => setImporte(e.target.value)}
										/>
										<TextField
											fullWidth
											type="number"
											size="small"
											label="Diferencia"
											name="diferencia"
											value={diferencia}
											onChange={(e) => setDif(e.target.value)}
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
					</form>
				</div>
			</>
		</>
	);
};
