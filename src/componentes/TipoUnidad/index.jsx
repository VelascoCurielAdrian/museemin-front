import { useMemo } from 'react';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { unidades } from '../../helpers/constants';

const getEstado = (value) => {
	return unidades.find((estado) => estado.id === value);
};

const Container = styled(Chip)(() => ({
	display: 'flex',
	alignItems: 'center',
	width: '100%',
}));

const TipoUnidad = ({ value, key }) => {
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

export default TipoUnidad;
