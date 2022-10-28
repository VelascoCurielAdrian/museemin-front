import { useState, Fragment } from 'react';
import { Formik, useFormik } from 'formik';
import { toast } from 'react-toastify';
import { FcPlus, FcCancel } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import { IconButton, LinearProgress, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

import useFormActions from '../../hooks/useFormv2';
import GQL, { validacion, dataCache } from './helper';
import TextField from '../../componentes/TextField';
import { Table as TableMui } from '../../componentes/Table/component';
import { Header } from '../../componentes/Header/component';
import { Estatus } from '../../componentes/Estatus/component';
import { TableBase } from '../../componentes/TableBase/component';
import { SearchField } from '../../componentes/SearchField/component';
import { EstadoHerramienta } from '../../componentes/EstadoHerramienta/component';
import { PaqueteHerramientasActions } from '../../actions/paqueteHerramientas';
import { HerramientasActions } from '../../actions/herramientas';
import { UploadFile } from '../../componentes/UploadFiles/component';
import { useMemo } from 'react';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { searchField } from '../../configuracion/apollo/cache';

const dataInicial = {
	descripcion: '',
};
export const PaqueteHerramienta = () => {
	const { id } = useParams();
	const txtBusqueda = useReactiveVar(searchField);
	const [dataForm, setDataForm] = useState({ ...dataInicial });
	const [image, setImage] = useState('');

	const { data, loading: loadingData } = useQuery(HerramientasActions.GET, {
		variables: {
			offset: null,
			limit: null,
			txtBusqueda,
		},
	});
	const { values, loading, isLoading, actionForm } = useFormActions({
		method: id ? 'update' : 'create',
		actions: PaqueteHerramientasActions,
		operation: 'getAllPaqueteHerramientas',
		name: 'paqueteHerramientas',
		formData: dataInicial,
		id,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDataForm({ ...dataForm, [name]: value });
	};
	const formik = useFormik({
		initialValues: values,
		validationSchema: validacion,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});
	const getUrlImage = (url) => {
		setImage(url);
	};

	if (loading) return <div>Cargando...</div>;
	return (
		<>
			<Header
				name="paqueteHerramientas"
				title="Paquete de herramientas"
				subtitle="Moduló de paquetes Herramientas"
				handleCreate={formik.handleSubmit}
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
					<form>
						<div className="overflow-hidden shadow sm:rounded-md">
							<div className="bg-white px-5 py-5 sm:p-2">
								<div className="grid grid-cols-8 gap-2">
									<div className="col-span-12 lg:col-span-3 md:col-span-12 sm:col-span-12 space-y-3">
										<TextField
											fullWidth
											id="usuario"
											size="small"
											name="descripcion"
											label="Nombre"
											value={dataForm.descripcion}
											onChange={handleChange}
										/>
										<UploadFile getUrl={getUrlImage} />
									</div>
									<div className="col-span-12 lg:col-span-5 md:col-span-12 sm:col-span-12 space-y-2">
										<label
											htmlFor="label-form"
											className="block mb-2 text-sm font-medium text-gray-700"
										>
											Seleccione las herramientas del paquete
										</label>
										<SearchField />
										{loadingData && <LinearProgress />}
										<TableContainer component={Paper} sx={{ maxHeight: 340 }}>
											<Table
												sx={{ width: '100%' }}
												stickyHeader
												aria-label="sticky table"
											>
												<TableHead>
													<TableRow>
														<TableCell>NOMBRE</TableCell>
														<TableCell>CLASIFICACIÓN</TableCell>
														<TableCell >CONDICIÓN</TableCell>
														<TableCell>ESTATUS</TableCell>
														<TableCell>ACCIÓN</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{data?.getAllHerramientas?.rows.map((row) => (
														<TableRow key={row.id}>
															<TableCell>{row.nombre}</TableCell>
															<TableCell>
																{row.clasificacion.descripcion}
															</TableCell>
															<TableCell>
																<EstadoHerramienta value={row.estado} />
															</TableCell>
															<TableCell>
																<Estatus value={row.estatus} />
															</TableCell>
															<TableCell>
																<Fragment>
																	<Tooltip
																		title="Agregar"
																		placement="left"
																		arrow
																		onClick={() => {}}
																	>
																		<IconButton>
																			<FcPlus
																				size={20}
																				className="text-green-700"
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
