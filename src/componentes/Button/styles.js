import { makeStyles } from '@mui/styles';
import paleta from '../../configuracion/paleta';

const styles = makeStyles(() => ({
	border: {
		backgroundColor: 'transparent',
		border: `1px solid ${paleta.bar.primary}`,
		'& span': {
			color: paleta.bar.primary,
		},
		'&:hover': {
			backgroundColor: 'transparent',
			opacity: 0.8,
		},
	},
	box: {
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
	},
}));

export default styles;
