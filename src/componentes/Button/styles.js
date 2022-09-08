import { makeStyles } from '@mui/styles';
import paleta from '../../configuracion/paleta';

const styles = makeStyles(() => ({
  boton: {
    textTransform: 'none',
    padding: '8px 20px',
    minHeight: 45,
    height: 45,
    backgroundColor: paleta.bar.primary,
    color: 'white',
    borderWidth: '1px',
    borderColor: paleta.bar.primary,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'flex',
    '& span': {
      color: paleta.sidebar.backgroundColor,
      '&.icono': {
        marginLeft: 10,
      },
    },
    '&:hover': {
      backgroundColor: paleta.bar.secondary,
      borderColor: paleta.bar.secondary,
    },
  },
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