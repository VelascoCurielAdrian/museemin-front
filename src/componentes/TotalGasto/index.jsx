import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled(Chip)(() => ({
	display: 'flex',
	alignItems: 'center',
	width: 100,
}));

export const TotalGasto = ({ importe, subTotal, total, key }) => {
	return (
		<Container
			key={key}
			size="small"
			color={subTotal <= importe ? 'success' : 'error'}
			label={total}
		/>
	);
};
