import { forwardRef, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FcPlus } from 'react-icons/fc';
import { FiSave } from 'react-icons/fi';
import Slide from '@mui/material/Slide';
import { GiCancel } from 'react-icons/gi';
import Dialog from '@mui/material/Dialog';
import { useForm, useWatch } from 'react-hook-form';
import DialogTitle from '@mui/material/DialogTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Tooltip, IconButton, useMediaQuery, useTheme, Grid} from '@mui/material';

import TablaArticulos from './tablaArticulos';
import TextField from '../../componentes/TextField';
import Button from '../../componentes/Button';
import { unidades } from '../../helpers/constants';
import {
	SelectFieldController,
	TextFieldController,
} from '../../componentes/Formulario';
import { ValidacionDetalleGasto } from '../../actions/gastos';


const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const defaultValues = {
	descripcion: '',
	precio: '',
	unidad: '',
	cantidad: '',
	importe: '',
	activo: true,
};

const getImporte = (precio, cantidad) => precio * cantidad;
const TotalImporte = ({ control, setValue }) => {
	const precio = useWatch({ control, name: 'precio' });
	const cantidad = useWatch({ control, name: 'cantidad' });
	const result = getImporte(precio, cantidad);
	setValue('importe', result);
	return (
		<TextField
			value={result}
			name="importe"
			label="importe"
			type="number"
			disabled
			fullWidth
		/>
	);
};

export const GestionGastos = ({
	handleClose,
	open,
	data,
	addGasto,
	onChange,
}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	const { control: controlGasto, reset, setValue: setValueGasto, handleSubmit, formState: { errors }} = useForm({
		resolver: yupResolver(ValidacionDetalleGasto),
		defaultValues,
	});

	const handleDelete = (item, index) => {
		const { gastoID, id } = item;
		const gastosAgregados = [...data];
		if (!gastoID) {
			gastosAgregados.splice(index, 1);
			onChange(gastosAgregados);
		}
		const gastosActivos = gastosAgregados.map((gasto) => {
			if (gasto.id === id) {
				return {
					...gasto,
					activo: false,
				};
			}
			return gasto;
		});
		onChange(gastosActivos);
	};
	const handleEdit = (item, index) => {
		console.log(item, index);
	};

	const SetnewGasto = async (data) => {
		await addGasto(data);
		reset(defaultValues);
	};

	return (
		<Dialog
			open={open}
			fullWidth
			maxWidth="xl"
			sx={{height: 'auto'}}
			fullScreen={fullScreen}
			TransitionComponent={Transition}
			onClose={handleClose}
		>
			<DialogTitle>Agregue los gastos que se realizaron.</DialogTitle>
			<DialogContent>
				<div className="overflow-hidden shadow sm:rounded-md">
					<div className="bg-white px-4 py-5 sm:p-6">
						<Grid container spacing={1}>
							<Grid item lg={3} md={8} sm={8} xs={12}>
								<TextFieldController
									control={controlGasto}
									name="descripcion"
									error={errors.descripcion}
									label="Descripcion"
									type="multiline"
								/>
							</Grid>
							<Grid item lg={2} md={4} sm={4} xs={12}>
								<SelectFieldController
									control={controlGasto}
									name="unidad"
									error={errors.unidad}
									options={unidades}
									labelProp="nombre"
									label="Tipo de unidad"
								/>
							</Grid>
							<Grid item lg={2} md={4} sm={4} xs={12}>
								<TextFieldController
									control={controlGasto}
									name="precio"
									error={errors.precio}
									label="Precio Unitario"
									type="number"
								/>
							</Grid>
							<Grid item lg={2} md={4} sm={4} xs={12}>
								<TextFieldController
									control={controlGasto}
									name="cantidad"
									error={errors.cantidad}
									label="Cantidad"
									type="number"
								/>
							</Grid>
							<Grid item lg={2} md={3} sm={4} xs={12}>
								<TotalImporte control={controlGasto} setValue={setValueGasto} />
							</Grid>
							<Grid item lg={1} md={1} sm={4} xs={12}>
								<>
									{fullScreen ? (
										<Button
											size="medium"
											label="Agregar"
											fullWidth
											className="bg-gray-700"
											onClick={handleSubmit(SetnewGasto)}
											icono={<FcPlus size={16} />}
										/>
									) : (
										<Tooltip
											title="Agregar"
											placement="top"
											arrow
											style={{ margin: 15 }}
											onClick={handleSubmit(SetnewGasto)}
										>
											<IconButton>
												<FcPlus size={32} />
											</IconButton>
										</Tooltip>
									)}
								</>
							</Grid>
							<Grid item xs={12}>
								<label
									htmlFor="detalleGastos"
									className="block text-sm mb-1 font-bold text-primary"
								>
									Tabla de gastos
								</label>
								<TablaArticulos
									data={data.filter(({ activo }) => activo) || []}
									handleDelete={handleDelete}
									handleEdit={handleEdit}
								/>
							</Grid>
						</Grid>
					</div>
				</div>
			</DialogContent>
			<DialogActions sx={{ marginRight: 2 }}>
				<Button
					onClick={() => {
						handleClose();
						reset({ descripcion: '' });
					}}
					label="Cancelar"
					fullWidth
					icono={<GiCancel size={16} />}
				/>
				<Button
					onClick={() => {}}
					label="Guardar"
					fullWidth
					icono={<FiSave size={16} />}
				/>
			</DialogActions>
		</Dialog>
	);
};
