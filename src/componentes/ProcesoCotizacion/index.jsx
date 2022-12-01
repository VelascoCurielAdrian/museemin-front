import { useMemo } from 'react';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { procesoCotizacion } from '../../helpers/constants';

const getEstado = (value) => {
	return procesoCotizacion.find((estado) => estado.id === value);
};

const Container = styled(Chip)(() => ({
	display: 'flex',
	alignItems: 'center',
	width: '100%',
}));

const ProcesoCotizacion = ({ value, key }) => {
	const estado = useMemo(() => getEstado(value), [value]);
	return (
		<Container
			key={key}
			size="small"
			color={estado?.color}
			label={estado?.nombre}
		/>
	);
};

export default ProcesoCotizacion;
