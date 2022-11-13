import { useMemo } from 'react';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tiposMetodoPago } from '../../helpers/constants';

const getEstado = (value) => {
	return tiposMetodoPago.find((estado) => estado.id === value);
};

const Container = styled(Chip)(() => ({
	display: 'flex',
	alignItems: 'center',
	width: 'auto',
}));

export const EstadoMetodoPago = ({ value, key }) => {
	const estado = useMemo(() => getEstado(value), [value]);
	return (
		<Container key={key} size="small" color="success" label={estado?.nombre} />
	);
};
