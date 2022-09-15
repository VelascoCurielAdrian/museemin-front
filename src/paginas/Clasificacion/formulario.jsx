import { forwardRef, useRef } from "react";
import { Formik } from "formik";
import { FiSave } from "react-icons/fi";
import Slide from "@mui/material/Slide";
import { GiCancel } from "react-icons/gi";
import { useMutation, useQuery } from "@apollo/client";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import Button from "../../componentes/Button";
import TextField from "../../componentes/TextField";
import { Table } from "../../componentes/Table/container";
import GQL, { validacion } from "./helper";
import { parseError } from "../../helpers";
import { toast } from "react-toastify";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

const columns = [
	{ field: "id", headerName: "ID", width: 120 },
	{
		field: "descripcion",
		headerName: "DESCRIPCIÓN",
		width: 250,
		editable: false,
	},
];
export const Clasificacion = ({ handleClose, open }) => {
	const formikRef = useRef(null);
	const [createClasificacion, { loading: loadingCreate }] = useMutation(
		GQL.CREATE,
		{
			update: (cache, { data: response }) => {
				const dataResponse = response[Object.keys(response)[0]];
				const oldQuery = cache.readQuery({
					query: GQL.GET,
					variables: {
						offset: null,
						limit: null,
					},
				});
				cache.writeQuery({
					query: GQL.GET,
					variables: {
						offset: null,
						limit: null,
					},
					data: {
						getAllCountClasificacion: {
							...oldQuery["getAllCountClasificacion"],
							count: oldQuery["getAllCountClasificacion"].count + 1,
							rows: [
								dataResponse.respuesta,
								...oldQuery["getAllCountClasificacion"].rows,
							],
						},
					},
				});
			},
			onCompleted: (response) => {
				toast.success(response.createClasificacion.mensaje);
				formikRef.current.resetForm();
				handleClose();
			},
			onError: (e) => {
				const parseErrors = parseError(e);
				parseErrors.forEach(({ message, name }) => {
					if (name === "BAD_USER_INPUT") {
						toast.error(`${Object.values(message)}`);
					}
				});
			},
		},
	);
	const { data, loading, error } = useQuery(GQL.GET, {
		variables: {
			offset: null,
			limit: null,
		},
	});

	const submitForm = () => {
		formikRef.current.submitForm();
	};

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
		>
			<DialogTitle>Agregue una clasificación de herremientas</DialogTitle>
			<DialogContent>
				<Formik
					innerRef={formikRef}
					initialValues={{ nombre: "" }}
					validationSchema={validacion}
					onSubmit={(values) => {
						const input = {
							descripcion: values.nombre,
							usuarioRegistroID: 1,
							estatus: true,
						};
						createClasificacion({
							variables: { input },
						});
					}}
				>
					{({ handleChange, values, touched, errors }) => (
						<div className='col-span-6 sm:col-span-2 mb-2'>
							<TextField
								fullWidth
								size='small'
								label='Nombre'
								name='nombre'
								value={values.nombre}
								onChange={handleChange}
								helperText={touched.nombre && errors.nombre}
								error={touched.nombre && Boolean(errors.nombre)}
							/>
						</div>
					)}
				</Formik>
				<br />
				<div className='col-span-6 sm:col-span-2'>
					<Table
						columns={columns}
						rows={data ? data?.getAllCountClasificacion?.rows : []}
						loading={loading}
						error={error}
						height={260}
					/>
				</div>
			</DialogContent>
			<DialogActions sx={{ marginRight: 2 }}>
				<Button
					onClick={handleClose}
					label='Cancelar'
					fullWidth
					icono={<GiCancel size={16} />}
				/>
				<Button
					showLoading
					onClick={submitForm}
					label='Guardar'
					fullWidth
					loading={loadingCreate}
					icono={<FiSave size={16} />}
				/>
			</DialogActions>
		</Dialog>
	);
};
