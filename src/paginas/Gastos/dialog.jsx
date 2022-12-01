import { forwardRef, useState } from 'react';
import Slide from '@mui/material/Slide';
import { FcPlus, FcOk } from 'react-icons/fc';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Tooltip,
	IconButton,
	useMediaQuery,
	useTheme,
	Grid,
} from '@mui/material';

import { ValidacionDetalleGasto } from '../../actions/gastos';
import TextField from '../../componentes/TextField';
import { unidades } from '../../helpers/constants';
import TablaArticulos from './tablaArticulos';
import Button from '../../componentes/Button';
import Dialog from '../../componentes/Dialog';
import {
	SelectFieldController,
	TextFieldController,
} from '../../componentes/Formulario';

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
	const [editGasto, setEditGasto] = useState({ show: false, idGasto: '' });
	const {
		control,
		reset,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
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

	const handleEdit = (item) => {
		setEditGasto({ show: true, idGasto: item.id });
		reset(item);
	};

	const editarGasto = (nuevaData) => {
		const gastosAgregados = [...data];
		const gastosActivos = gastosAgregados.map((gasto) => {
			if (gasto.id === editGasto.idGasto) {
				return nuevaData;
			}
			return gasto;
		});
		onChange(gastosActivos);
		reset(defaultValues);
		setEditGasto({ show: false, idGasto: '' });
	};

	const SetnewGasto = (data) => {
		addGasto(data);
		reset(defaultValues);
	};

	return (
		<Dialog
			open={open}
			title="Agregue los gastos que se realizaron."
			onClose={() => {
				handleClose();
				setEditGasto({ show: false, idGasto: '' });
				reset(defaultValues);
			}}
		>
			<Grid container spacing={1}>
				<Grid item lg={3} md={8} sm={8} xs={12}>
					<TextFieldController
						control={control}
						name="descripcion"
						error={errors.descripcion}
						label="Descripcion"
						type="multiline"
					/>
				</Grid>
				<Grid item lg={2} md={4} sm={4} xs={12}>
					<SelectFieldController
						control={control}
						name="unidad"
						error={errors.unidad}
						options={unidades}
						labelProp="nombre"
						label="Tipo de unidad"
					/>
				</Grid>
				<Grid item lg={2} md={4} sm={4} xs={12}>
					<TextFieldController
						control={control}
						name="precio"
						error={errors.precio}
						label="Precio Unitario"
						type="number"
					/>
				</Grid>
				<Grid item lg={2} md={4} sm={4} xs={12}>
					<TextFieldController
						control={control}
						name="cantidad"
						error={errors.cantidad}
						label="Cantidad"
						type="number"
					/>
				</Grid>
				<Grid item lg={2} md={3} sm={4} xs={12}>
					<TotalImporte control={control} setValue={setValue} />
				</Grid>
				<Grid item lg={1} md={1} sm={4} xs={12}>
					<>
						{fullScreen ? (
							<Button
								size="medium"
								label={editGasto.show ? 'Actualizar' : 'Agregar'}
								fullWidth
								className="bg-gray-700"
								onClick={(e) => {
									if (editGasto.show) {
										handleSubmit(editarGasto)(e);
									} else {
										handleSubmit(SetnewGasto)(e);
									}
								}}
								icono={
									editGasto.show ? <FcOk size={16} /> : <FcPlus size={16} />
								}
							/>
						) : (
							<Tooltip
								title={editGasto.show ? 'Actualizar' : 'Agregar'}
								placement="top"
								arrow
								style={{ margin: 15 }}
								onClick={(e) => {
									if (editGasto.show) {
										handleSubmit(editarGasto)(e);
									} else {
										handleSubmit(SetnewGasto)(e);
									}
								}}
							>
								<IconButton>
									{editGasto.show ? <FcOk size={32} /> : <FcPlus size={32} />}
								</IconButton>
							</Tooltip>
						)}
					</>
				</Grid>
				<Grid item xs={12}>
					<TablaArticulos
						data={data.filter(({ activo }) => activo) || []}
						handleDelete={handleDelete}
						handleEdit={handleEdit}
					/>
				</Grid>
			</Grid>
		</Dialog>
	);
};
