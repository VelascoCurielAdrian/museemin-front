import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled(Chip)(() => ({
	display: 'flex',
	alignItems: 'center',
	width: 100,
}));

export const Generos = ({ value, key }) => {
	return (
		<Container
			key={key}
			size="small"
			color={value === 'M' ? 'info' : 'secondary'}
			label={value === 'M' ? 'Masculino' : 'Femenino'}
		/>
	);
};
