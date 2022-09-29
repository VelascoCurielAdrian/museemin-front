import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { FaSearch } from 'react-icons/fa';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { BsPlusLg } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import { FiSave } from 'react-icons/fi';
import paleta from '../../configuracion/paleta';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	margin: 6,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	borderWidth: 1,
	borderRadius: 10,
	'& .MuiInputBase-input': {
		padding: theme.spacing(1.2, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

const TitleContainer = styled('div')(() => ({
	alignItems: 'center',
	flexGrow: 1,
	display: { xs: 'none', sm: 'block' },
}));

const Container = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'row',
	marginBottom: 10,
	[theme.breakpoints.only('xs')]: {
		marginBottom: 60,
		flexDirection: 'column',
		maxHeight: 100,
	},
}));

const Actions = styled('div')(() => ({
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'flex-end',
}));
export const Header = ({
	title,
	subtitle,
	listado,
	buscar,
	agregar,
	handleNew,
	handleCreate,
	handleCancelar,
}) => {
	const [txtBusqueda, setTxtBusqueda] = useState('');
	const [txtBusquedaAnterior, setTxtBusquedaAnterior] = useState('');

	const manejadorKeyDown = (e) => {
		if (e.key === 'Enter' && buscar)
			if (txtBusquedaAnterior !== txtBusqueda) {
				buscar(txtBusqueda);
				setTxtBusquedaAnterior(txtBusqueda);
			}
	};

	return (
		<Actions>
			<Container flex={1}>
				<TitleContainer>
					<Typography variant="subtitle" noWrap>
						{title}
					</Typography>
					<Typography
						variant="subtitle2"
						sx={{
							color: paleta.bar.elements,
							fontSize: 12,
						}}
						noWrap
					>
						{subtitle}
					</Typography>
				</TitleContainer>
				{listado && (
					<>
						<Search>
							<SearchIconWrapper>
								<FaSearch />
							</SearchIconWrapper>
							<StyledInputBase
								size="large"
								fullWidth
								placeholder="Buscar"
								value={txtBusqueda}
								onChange={({ target: { value } }) => setTxtBusqueda(value)}
								inputProps={{ 'aria-label': 'search' }}
								onKeyDown={manejadorKeyDown}
							/>
						</Search>
						<Search>
							<Button
								size="medium"
								fullWidth
								variant="contained"
								onClick={handleNew}
								startIcon={<BsPlusLg size={16} />}
							>
								Agregar
							</Button>
						</Search>
					</>
				)}

				{agregar && (
					<>
						<Search>
							<Button
								size="medium"
								fullWidth
								variant="contained"
								onClick={handleCancelar}
								startIcon={<GiCancel size={16} />}
							>
								Cancelar
							</Button>
						</Search>
						<Search>
							<Button
								size="medium"
								fullWidth
								variant="contained"
								onClick={handleCreate}
								startIcon={<FiSave size={16} />}
							>
								Guardar
							</Button>
						</Search>
					</>
				)}
			</Container>
		</Actions>
	);
};
