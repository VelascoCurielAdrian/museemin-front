import { Link, Typography } from "@mui/material";

const Copyright = (props) => (
	<Typography variant='body2' color='text.secondary' align='center' {...props}>
		{'Copyright © '}
		<Link color='inherit' href='#'>
			Museemin
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	</Typography>
);

export default Copyright;