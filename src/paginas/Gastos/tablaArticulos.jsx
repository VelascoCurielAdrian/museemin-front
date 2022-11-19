import React, { memo } from 'react';
import {
	Paper,
	Table,
	TableRow,
	TableHead,
	TableBody,
	IconButton,
	TableContainer,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import PropTypes from 'prop-types';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import { EmptyRows } from '../../componentes/EmptyRows/component';
import { styled } from '@mui/styles';
import paleta from '../../configuracion/paleta';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
    backgroundColor: paleta.bar.border,
    color: paleta.bar.details,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TablaArticulos = ({ data, handleEdit, handleDelete }) => {
	return (
		<>
			<TableContainer component={Paper} sx={{ width: '100%', height: '80%' }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<StyledTableRow>
							<StyledTableCell>DECRIPCIÓN</StyledTableCell>
							<StyledTableCell>UNIDAD</StyledTableCell>
							<StyledTableCell>PRECIO</StyledTableCell>
							<StyledTableCell>CANTIDAD</StyledTableCell>
							<StyledTableCell>PRECIO PARCIAL</StyledTableCell>
							<StyledTableCell>ACCIONES</StyledTableCell>
						</StyledTableRow>
					</TableHead>
					<TableBody>
						{data.map((item, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell>{item.descripcion}</StyledTableCell>
								<StyledTableCell>{item.unidad}</StyledTableCell>
								<StyledTableCell>{item.precio}</StyledTableCell>
								<StyledTableCell>{item.cantidad}</StyledTableCell>
								<StyledTableCell>{item.importe}</StyledTableCell>
								<StyledTableCell>
									<>
										<IconButton onClick={() => handleEdit(item, index)}>
											<FiEdit size={18} className="text-red-600" />
										</IconButton>
										<IconButton onClick={() => handleDelete(item, index)}>
											<MdOutlineDelete size={18} className="text-red-600" />
										</IconButton>
									</>
								</StyledTableCell>
							</StyledTableRow>
						))}
						{data.length === 0 && (
							<StyledTableRow>
								<StyledTableCell align="left" colSpan={23}>
									<EmptyRows />
								</StyledTableCell>
							</StyledTableRow>
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
