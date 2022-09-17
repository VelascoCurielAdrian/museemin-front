import { forwardRef } from "react";
import { Formik } from "formik";
import { FiSave } from "react-icons/fi";
import Slide from "@mui/material/Slide";
import { GiCancel } from "react-icons/gi";
import { useQuery } from "@apollo/client";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import Button from "../../componentes/Button";
import TextField from "../../componentes/TextField";
import { Table } from "../../componentes/Table/container";
import GQL, { validacion, dataCache } from "./helper";
import { useFormularion } from "../../componentes/Formulario/component";

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
	const { ActionForm, submitForm, isLoading, formikRef } = useFormularion(
		{ action: "create" },
		dataCache,
		GQL.CREATE,
		GQL.CREATE,
		GQL.GET,
		handleClose,
	);
	const { data, loading, error } = useQuery(GQL.GET, {
		variables: {
			offset: null,
			limit: null,
		},
	});

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
						ActionForm({
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
					loading={isLoading}
					icono={<FiSave size={16} />}
				/>
			</DialogActions>
		</Dialog>
	);
};
