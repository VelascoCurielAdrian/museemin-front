import { useState, Fragment } from 'react';
import { Formik, useFormik } from 'formik';
import { toast } from 'react-toastify';
import { FcPlus, FcCancel } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
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
import TableBase from '../../componentes/TableBase';
import { SearchField } from '../../componentes/SearchField/component';
import { EstadoHerramienta } from '../../componentes/EstadoHerramienta/component';
import { PaqueteHerramientasActions } from '../../actions/paqueteHerramientas';
import { HerramientasActions } from '../../actions/herramientas';
import { UploadFile } from '../../componentes/UploadFiles/component';
import { useMemo } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';

const dataInicial = {
	descripcion: '',
};

export const PaqueteHerramienta = () => {
	const { id } = useParams();
	const [dataHerramientas, setDataHerramientas] = useState([]);
	const [dataRows, setDataRows] = useState([]);
	const [image, setImage] = useState('');
	const { values, loading, isLoading, actionForm } = useFormActions({
		method: id ? 'update' : 'create',
		actions: PaqueteHerramientasActions,
		operation: 'getAllPaqueteHerramientas',
		name: 'paqueteHerramientas',
		formData: dataInicial,
		id,
	});

	const [getData, { data }] = useLazyQuery(HerramientasActions.GET, {
		variables: {
			offset: null,
			limit: null,
			txtBusqueda: '',
		},
	});

	useEffect(() => {
		getData();
		if (data) {
			setDataRows(data);
		}
	}, []);

	const formik = useFormik({
		initialValues: dataInicial,
		validationSchema: validacion,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	const handleAdd = (value) => {
		const existe = dataHerramientas.find(
			(herramienta) => herramienta.id === value.id,
		);
		if (existe) {
			return toast.error('No Puede agregar las misma herramienta.');
		}
		setDataHerramientas([...dataHerramientas, value]);
	};

	const handleRemove = (index) => {
		const herramientas = [...dataHerramientas];
		herramientas.splice(index, 1);
		setDataHerramientas(herramientas);
	};

	const herramientasAgregadas = [
		{ field: 'id', headerName: 'ID', width: 80 },
		{
			field: 'nombre',
			headerName: 'NOMBRE',
			width: 150,
			editable: false,
		},
		{
			field: 'clasificacion',
			headerName: 'CLASIFICACIÓN',
			width: 150,
			editable: false,
			valueGetter: ({ value }) => value.descripcion,
		},
		{
			field: 'estado',
			headerName: 'CONDICIÓN',
			width: 120,
			editable: false,
			renderCell: ({ value, index }) => (
				<EstadoHerramienta key={index} value={value} />
			),
		},
		{
			field: 'estatus',
			headerName: 'ESTATUS',
			width: 120,
			editable: false,
			renderCell: ({ value, index }) => <Estatus key={index} value={value} />,
		},
		{
			field: 'actions',
			headerName: 'ACCIÓN',
			editable: false,
			renderCell: ({ row, index }) => {
				return (
					<Fragment>
						<Tooltip
							title="Eliminar"
							placement="right"
							arrow
							onClick={() => {
								handleRemove(row, index);
							}}
						>
							<IconButton>
								<FcCancel size={20} className="text-green-700" />
							</IconButton>
						</Tooltip>
					</Fragment>
				);
			},
		},
	];

	const ToolsAdd = () => {
		const data = dataHerramientas.map((herramientas) => ({
			herramientaID: herramientas.id,
		}));
		return data;
	};

	const herramientas = useMemo(
		() => [
			{
				field: 'nombre',
				headerName: 'NOMBRE',
				width: 150,
				editable: false,
			},
			{
				field: 'clasificacion',
				headerName: 'CLASIFICACIÓN',
				width: 150,
				editable: false,
				valueGetter: ({ value }) => value.descripcion,
			},
			{
				field: 'actions',
				headerName: 'ACCIÓN',
				editable: false,
				renderCell: ({ row, index }) => {
					return (
						<Fragment>
							<Tooltip
								title="Agregar"
								placement="left"
								arrow
								onClick={() => {
									handleAdd(row, index);
								}}
							>
								<IconButton>
									<FcPlus size={20} className="text-green-700" />
								</IconButton>
							</Tooltip>
						</Fragment>
					);
				},
			},
		],
		[ToolsAdd],
	);

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
									<div className="col-span-8 sm:col-span-3 space-y-3">
										<TextField
											fullWidth
											id="usuario"
											size="small"
											name="descripcion"
											label="Nombre"
											autoFocus
											value={formik.values.descripcion}
											onChange={formik.handleChange}
											helperText={
												formik.touched.descripcion && formik.errors.descripcion
											}
											error={
												formik.touched.descripcion &&
												Boolean(formik.errors.descripcion)
											}
										/>
										<UploadFile getUrl={getUrlImage} />
										<label
											htmlFor="label-form"
											className="block mb-2 text-sm font-medium text-gray-700"
										>
											Seleccione las herramientas del paquete
										</label>
										<SearchField />
										<TableContainer component={Paper}>
											<Table sx={{ minWidth: 650 }} aria-label="simple table">
												<TableHead>
													<TableRow>
														<TableCell>Dessert (100g serving)</TableCell>
														<TableCell align="right">Calories</TableCell>
														<TableCell align="right">Fat&nbsp;(g)</TableCell>
														<TableCell align="right">Carbs&nbsp;(g)</TableCell>
														<TableCell align="right">
															Protein&nbsp;(g)
														</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{rows.map((row) => (
														<TableRow
															key={row.name}
															sx={{
																'&:last-child td, &:last-child th': {
																	border: 0,
																},
															}}
														>
															<TableCell component="th" scope="row">
																{row.name}
															</TableCell>
															<TableCell align="right">
																{row.calories}
															</TableCell>
															<TableCell align="right">{row.fat}</TableCell>
															<TableCell align="right">{row.carbs}</TableCell>
															<TableCell align="right">{row.protein}</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>
										{/* <Table
											showPaginate={false}
											height={350}
											uri={GQL.GET}
											urlDelete={{
												gql: GQL.DELETE,
												params: 'deleteHerramientaId',
											}}
											dataCache={dataCache}
											columns={herramientas}
										/> */}
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
