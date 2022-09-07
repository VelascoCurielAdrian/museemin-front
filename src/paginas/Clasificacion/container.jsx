import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import TextField from '../../componentes/TextField';
import ButtonCustomized from '../../componentes/Button';

const styles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 20,
		[theme.breakpoints.only('xs')]: {
			flexDirection: 'column',
			alignItems: 'flex-start',
			maxHeight: 100,
		},
	},
	titleContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	subtitle: {
		color: 'blue',
		marginTop: 3,
		fontSize: 11,
		marginLeft: 10,
	},
	actionContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	btnAdd: {
		backgroundColor: 'blue',
		'& span': {
			color: 'blue',
			marginLeft: 10,
		},
		'&:hover': {
			backgroundColor: 'blue',
			opacity: 0.8,
		},
		[theme.breakpoints.only('xs')]: {
			'& .MuiTypography-root': {
				display: 'none',
			},
		},
	},
	textField: {
		width: 250,
		[theme.breakpoints.only('xs')]: {
			width: 180,
		},
	},
	btn: {
		margin: '0 2px',
	},
}));

export default styles;

export const Clasificacion = ({ customStyles, placeHolder }) => {
	const classes = styles();
	return (
		<div>
			{/* <Box>Clasificación</Box> */}
			<Box flex={1} className={classes.root}>
				<div className={classes.titleContainer}>
					<Typography
						component='h1'
						className={classes.title}
						style={customStyles}
					>
						Clasificacion
					</Typography>
					<Typography className={classes.subtitle}>Clasificacion</Typography>
				</div>
				<Box flex={1} className={classes.actionContainer}>
					<TextField
            size='small'
						name='txtBusqueda'
						placeHolder={placeHolder}
						className={classes.textField}
						onChange={() => {}}
						value={''}
					/>
					<ButtonCustomized
            styles={{ marginLeft: 'auto'}}
						label='Buscar'
						onClick={() => {}}
					/>
				</Box>
			</Box>
		</div>
	);
};
