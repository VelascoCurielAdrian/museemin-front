import { useState, Fragment } from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { FcPlus, FcCancel } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';

import useFormActions from '../../hooks/useFormv2';
import GQL, { validacion, dataCache } from './helper';
import TextField from '../../componentes/TextField';
import { Table } from '../../componentes/Table/component';
import { Header } from '../../componentes/Header/component';
import { Estatus } from '../../componentes/Estatus/component';
import { TableBase } from '../../componentes/TableBase/component';
import { SearchField } from '../../componentes/SearchField/component';
import { EstadoHerramienta } from '../../componentes/EstadoHerramienta/component';
import { PaqueteHerramientasActions } from '../../actions/paqueteHerramientas';
import { UploadFile } from '../../componentes/UploadFiles/component';

const dataInicial = {
	descripcion: '',
};

export const PaqueteHerramienta = () => {
	const { id } = useParams();
	const [dataHerramientas, setDataHerramientas] = useState([]);
	const [filePreview, setFilePreview] = useState('');
	const { save, formRef, values, loading, isLoading, actionForm } =
		useFormActions({
			method: id ? 'update' : 'create',
			actions: PaqueteHerramientasActions,
			operation: 'getAllPaqueteHerramientas',
			name: 'paqueteHerramientas',
			formData: dataInicial,
			id,
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

	const herramientas = [
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
	];

	const ToolsAdd = () => {
		const data = dataHerramientas.map((herramientas) => ({
			herramientaID: herramientas.id,
		}));

		return data;
	};

	const getUrlImage = (url) => {
		setFilePreview(url);
	};
	if (loading) return <div>Cargando...</div>;
	return (
		<>
			<Header
				name="paqueteHerramientas"
				title="Paquete de herramientas"
				subtitle="Moduló de paquetes Herramientas"
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
						validationSchema={validacion}
						onSubmit={(values) => {
							const input = {
								descripcion: values.descripcion,
								CapturaPaqueteHerramientas: ToolsAdd(),
								usuarioRegistroID: 1,
							};
							actionForm({
								variables: { updatePaqueteHerramientaId: id, input },
							});
						}}
					>
						{({ handleChange, values, touched, errors }) => (
							<div className="overflow-hidden shadow sm:rounded-md">
								<div className="bg-white px-5 py-5 sm:p-2">
									<div className="grid grid-cols-8 gap-2">
										<div className="col-span-8 sm:col-span-3 space-y-3">
											<TextField
												fullWidth
												size="small"
												label="Descripción"
												name="descripcion"
												autoFocus
												value={values.descripcion}
												onChange={handleChange}
												helperText={touched.descripcion && errors.descripcion}
												error={
													touched.descripcion && Boolean(errors.descripcion)
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
											<Table
												showPaginate={false}
												height={250}
												uri={GQL.GET}
												urlDelete={{
													gql: GQL.DELETE,
													params: 'deleteHerramientaId',
												}}
												dataCache={dataCache}
												columns={herramientas}
											/>
										</div>
										<div className="col-span-8 sm:col-span-5">
											<label
												htmlFor="label-form"
												className="block mb-2 text-sm font-medium text-gray-700"
											>
												Tabla de herramientas agregadas
											</label>
											<TableBase
												height={300}
												showPaginate={false}
												columns={herramientasAgregadas}
												data={dataHerramientas}
											/>
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
