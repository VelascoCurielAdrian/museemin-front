import { Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

export const ContentButton = styled('div')(({ theme }) => ({
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

export const TitleContainer = styled('div')(() => ({
	alignItems: 'center',
	flexGrow: 1,
	display: { xs: 'none', sm: 'block' },
}));

export const Container = styled(Box)(({ theme }) => ({
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

export const Actions = styled('div')(() => ({
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'flex-end',
}));
