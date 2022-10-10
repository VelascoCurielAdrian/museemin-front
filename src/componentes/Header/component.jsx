import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { BsPlusLg } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import { FiSave } from 'react-icons/fi';
import paleta from '../../configuracion/paleta';
import { SearchField } from '../SearchField/component';
import { Actions, Container, ContentButton, TitleContainer } from './styles';

export const Header = ({
	name,
	title,
	subtitle,
	listado,
	agregar,
	handleNew,
	handleCreate,
}) => {
	const navigate = useNavigate();
	const handleBack = () => {
		navigate(`/${name}`, {
			replace: true,
		});
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
						sx={{ color: paleta.bar.elements, fontSize: 12 }}
						noWrap
					>
						{subtitle}
					</Typography>
				</TitleContainer>
				{listado && (
					<>
						<SearchField />
						<ContentButton>
							<Button
								size="medium"
								fullWidth
								variant="contained"
								onClick={handleNew}
								startIcon={<BsPlusLg size={16} />}
							>
								Agregar
							</Button>
						</ContentButton>
					</>
				)}

				{agregar && (
					<>
						<ContentButton>
							<Button
								size="medium"
								fullWidth
								variant="contained"
								onClick={handleBack}
								startIcon={<GiCancel size={16} />}
							>
								Cancelar
							</Button>
						</ContentButton>
						<ContentButton>
							<Button
								size="medium"
								fullWidth
								variant="contained"
								onClick={handleCreate}
								startIcon={<FiSave size={16} />}
							>
								Guardar
							</Button>
						</ContentButton>
					</>
				)}
			</Container>
		</Actions>
	);
};
