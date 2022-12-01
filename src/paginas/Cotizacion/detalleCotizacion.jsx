import { yupResolver } from '@hookform/resolvers/yup';
import {
	Grid,
	IconButton,
	Tooltip,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FcPlus, FcOk } from 'react-icons/fc';
import { unidades } from '../../helpers/constants';
import {
	SelectFieldController,
	TextFieldController,
} from '../../componentes/Formulario';
import TablaArticulos from './tablaArticulos';
import Button from '../../componentes/Button';
import TextField from '../../componentes/TextField';
import { ValidacionDetalleCotizacion } from '../../actions/cotizaciones';

const defaultValues = {
	descripcion: '',
	unidad: '',
	precio: '',
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

export const DetalleCotizacion = ({ addCotizacion, onChange, data }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	const [editCotizacion, setEditCotizacion] = useState({
		show: false,
		idCotizacion: '',
	});

	const {
		reset,
		control,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(ValidacionDetalleCotizacion),
		defaultValues,
	});

	const handleDelete = (item, index) => {
		const { cotizacionID, id } = item;
		const serviciosAgregados = [...data];
		if (!cotizacionID) {
			serviciosAgregados.splice(index, 1);
			onChange(serviciosAgregados);
		}
		const cotizacionActivos = serviciosAgregados.map((cotizacion) => {
			if (cotizacion.id === id) {
				return {
					...cotizacion,
					activo: false,
				};
			}
			return cotizacion;
		});
		onChange(cotizacionActivos);
	};

	const handleEdit = (item) => {
		setEditCotizacion({ show: true, idCotizacion: item.id });
		reset(item);
	};

	const editarCotizacion = (nuevaData) => {
		const gastosAgregados = [...data];
		const serviciosActivos = gastosAgregados.map((gasto) => {
			if (gasto.id === editCotizacion.idCotizacion) {
				return nuevaData;
			}
			return gasto;
		});
		onChange(serviciosActivos);
		reset(defaultValues);
		setEditCotizacion({ show: false, idCotizacion: '' });
	};

	const SetnewCotizacion = (data) => {
		addCotizacion(data);
		reset(defaultValues);
	};

	return (
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
							label={editCotizacion.show ? 'Actualizar' : 'Agregar'}
							fullWidth
							className="bg-gray-700"
							onClick={(e) => {
								if (editCotizacion.show) {
									handleSubmit(editarCotizacion)(e);
								} else {
									handleSubmit(SetnewCotizacion)(e);
								}
							}}
							icono={editCotizacion.show ? <FcOk size={16} /> : <FcPlus size={16} />}
						/>
					) : (
						<Tooltip
							title={editCotizacion.show ? 'Actualizar' : 'Agregar'}
							placement="top"
							arrow
							style={{ top: 22 }}
							onClick={(e) => {
								if (editCotizacion.show) {
									handleSubmit(editarCotizacion)(e);
								} else {
									handleSubmit(SetnewCotizacion)(e);
								}
							}}
						>
							<IconButton>
								{editCotizacion.show ? (
									<FcOk size={32} />
								) : (
									<FcPlus size={32} />
								)}
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
	);
};
