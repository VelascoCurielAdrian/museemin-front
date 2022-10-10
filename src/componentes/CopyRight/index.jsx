import { Link, Typography } from '@mui/material';

const Copyright = (props) => (
	<Typography variant="body2" color="text.secondary" align="center" {...props}>
		{'Copyright © '}
		<Link color="inherit" href="#">
			Multiservicios Especializados En Mantenimiento Industrial
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	</Typography>
);

export default Copyright;
