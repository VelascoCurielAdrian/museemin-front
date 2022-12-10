import React, { memo } from 'react';
import {
	Paper,
	Table,
	TableRow,
	TableHead,
	TableCell,
	TableBody,
	Tooltip,
	IconButton,
	TableContainer,
} from '@mui/material';
import PropTypes from 'prop-types';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import { EmptyRows } from '../../componentes/EmptyRows/component';
import TipoUnidad from '../../componentes/TipoUnidad';

const TablaArticulos = ({ data, handleEdit, handleDelete }) => {
	return (
		<>
			<TableContainer
				sx={{ width: '100%', height: 255, maxHeight: 400 }}
			>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell align="left">DECRIPCIÓN</TableCell>
							<TableCell>UNIDAD</TableCell>
							<TableCell>PRECIO</TableCell>
							<TableCell>CANTIDAD</TableCell>
							<TableCell>PRECIO PARCIAL</TableCell>
							<TableCell>ACCIONES</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((item, index) => (
							<TableRow key={index}>
								<TableCell align='right'>
									{item.descripcion}
								</TableCell>
								<TableCell>
									<TipoUnidad value={item.unidad} />
								</TableCell>
								<TableCell>{item.precio}</TableCell>
								<TableCell>{item.cantidad}</TableCell>
								<TableCell>{item.importe}</TableCell>
								<TableCell>
									<>
										<Tooltip
											title="Editar"
											placement="left"
											arrow
											onClick={() => handleEdit(item, index)}
										>
											<IconButton>
												<FiEdit size={18} />
											</IconButton>
										</Tooltip>
										<Tooltip
											title="Eliminar"
											placement="right"
											arrow
											onClick={() => handleDelete(item, index)}
										>
											<IconButton>
												<MdOutlineDelete size={18} />
											</IconButton>
										</Tooltip>
									</>
								</TableCell>
							</TableRow>
						))}
						{data.length === 0 && (
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

export default memo(TablaArticulos);
