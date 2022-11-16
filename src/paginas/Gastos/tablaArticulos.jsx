import React, { useEffect } from 'react';
import { 
	Paper, Table, TableRow, TableHead, TableCell, 
	TableContainer, TableBody, Tooltip, IconButton
} from '@mui/material';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import { MdCancel } from 'react-icons/md';
import { EmptyRows } from '../../componentes/EmptyRows/component';
import {
	SelectFieldController,
	TextFieldController,
} from '../../componentes/Formulario';
import { unidades } from '../../helpers/constants';

const TablaArticulos = ({ data, control, errors, setValue, remove }) => {
	const articulos = useWatch({ control, name: 'articulos' });

	useEffect(() => {
		let subTotal = 0;
		if (articulos?.length > 0) {
			articulos.forEach((item) => {
				subTotal += item?.precio * item?.cantidad;
			});
		}
		setValue('subTotal', subTotal);
	}, [articulos]);

	const setPrecioParcial = (index, cantidad, precio) => {
		let precioParcial = cantidad * precio;
		setValue(`articulos[${index}].precioParcial`, precioParcial);
	};

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ width: '100%' }} stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell>DECRIPCIÓN</TableCell>
							<TableCell>UNIDAD</TableCell>
							<TableCell>PRECIO</TableCell>
							<TableCell>CANTIDAD</TableCell>
							<TableCell>PRECIO PARCIAL</TableCell>
							<TableCell>ACCIÓN</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.length > 0 ? (
							data.map((item, index) => (
								<TableRow key={item.id}>
									<TableCell>
										<TextFieldController
											control={control}
											name={`articulos[${index}].descripcion`}
											error={errors.articulos?.[index]?.descripcion}
											messageError={false}
										/>
									</TableCell>
									<TableCell>
										<SelectFieldController
											control={control}
											name={`articulos[${index}].unidad`}
											error={errors.articulos?.[index]?.unidad}
											messageError={false}
											options={unidades}
											labelProp="nombre"
										/>
									</TableCell>
									<TableCell>
										<TextFieldController
											control={control}
											type="number"
											name={`articulos[${index}].precio`}
											error={errors.articulos?.[index]?.precio}
											onChangeCustom={(e) => {
												const precio = e.target.value;
												setPrecioParcial(
													index,
													precio,
													articulos[index].cantidad,
												);
												return precio;
											}}
											messageError={false}
										/>
									</TableCell>
									<TableCell>
										<TextFieldController
											control={control}
											type="number"
											name={`articulos[${index}].cantidad`}
											error={errors.articulos?.[index]?.cantidad}
											messageError={false}
											onChangeCustom={(e) => {
												const cantidad = e.target.value;
												setPrecioParcial(
													index,
													cantidad,
													articulos[index].precio,
												);
												return cantidad;
											}}
										/>
									</TableCell>
									<TableCell>
										<label className="text-sm m-2 font-bold text-green-700">
											{`$ ${articulos?.[index]?.precioParcial || '0.00'}`}
										</label>
									</TableCell>
									<TableCell>
										{!articulos?.[index]?.gastoID && (
											<>
												<Tooltip
													title="Eliminar"
													placement="bottom-end"
													arrow
													onClick={() => remove(index)}
												>
													<IconButton>
														<MdCancel size={20} className="text-red-600" />
													</IconButton>
												</Tooltip>
											</>
										)}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell align="left" colSpan={23}>
									<EmptyRows />
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

TablaArticulos.propTypes = {
	onChange: PropTypes.func,
	data: PropTypes.array,
};

TablaArticulos.defaultProps = {
	data: [],
};

export default React.memo(TablaArticulos);
