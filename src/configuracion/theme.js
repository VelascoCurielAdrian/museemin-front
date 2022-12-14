import { createTheme } from '@mui/material';
export const theme = createTheme({
	components: {
		MuiListItemButton: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						borderLeft: `5px solid red`,
					},
				},
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
				sizeSmall: {
					padding: '6px 16px',
				},
				sizeMedium: {
					padding: '8px 20px',
				},
				sizeLarge: {
					padding: '11px 24px',
				},
				textSizeSmall: {
					padding: '7px 12px',
				},
				textSizeMedium: {
					padding: '9px 16px',
				},
				textSizeLarge: {
					padding: '12px 16px',
				},
			},
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: '32px 24px',
					'&:last-child': {
						paddingBottom: '32px',
					},
				},
			},
		},
		MuiCardHeader: {
			defaultProps: {
				titleTypographyProps: {
					variant: 'h6',
				},
				subheaderTypographyProps: {
					variant: 'body2',
				},
			},
			styleOverrides: {
				root: {
					padding: '32px 24px',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				'*': {
					boxSizing: 'border-box',
					margin: 0,
					padding: 0,
				},
				html: {
					MozOsxFontSmoothing: 'grayscale',
					WebkitFontSmoothing: 'antialiased',
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100%',
					width: '100%',
				},
				body: {
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					minHeight: '100%',
					width: '100%',
				},
				'#__next': {
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					height: '100%',
					width: '100%',
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					borderColor: '#E6E8F0',
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: '#F3F4F6',
					'.MuiTableCell-root': {
						color: '#374151',
					},
					borderBottom: 'none',
					'& .MuiTableCell-root': {
						borderBottom: 'none',
						fontSize: '12px',
						fontWeight: 600,
						lineHeight: 1,
						letterSpacing: 0.5,
						textTransform: 'uppercase',
					},
					'& .MuiTableCell-paddingCheckbox': {
						paddingTop: 4,
						paddingBottom: 4,
					},
				},
			},
		},
	},
	palette: {
		neutral: {
			100: '#F3F4F6',
			200: '#E5E7EB',
			300: '#D1D5DB',
			400: '#9CA3AF',
			500: '#6B7280',
			600: '#4B5563',
			700: '#374151',
			800: '#1F2937',
			900: '#111827',
		},
		action: {
			active: '#6B7280',
			focus: 'rgba(55, 65, 81, 0.12)',
			hover: 'rgba(55, 65, 81, 0.04)',
			selected: 'rgba(55, 65, 81, 0.08)',
			disabledBackground: 'rgba(55, 65, 81, 0.12)',
			disabled: 'rgba(55, 65, 81, 0.26)',
		},
		background: {
			default: '#F9FAFC',
			paper: '#FFFFFF',
		},
		divider: '#E6E8F0',
		primary: {
			main: '#003366',
			light: '#828DF8',
			dark: '#3832A0',
			contrastText: '#FFFFFF',
		},
		secondary: {
			main: '#f50057',
			light: '#3FC79A',
			dark: '#0B815A',
			contrastText: '#FFFFFF',
		},
		success: {
			main: '#14B8A6',
			light: '#43C6B7',
			dark: '#0E8074',
			contrastText: '#FFFFFF',
		},
		info: {
			main: '#2196F3',
			light: '#64B6F7',
			dark: '#0B79D0',
			contrastText: '#FFFFFF',
			masculino: '#2196f3',
			femenino: '#f50057',
		},
		warning: {
			main: '#FFB020',
			light: '#FFBF4C',
			dark: '#B27B16',
			contrastText: '#FFFFFF',
		},
		error: {
			main: '#D14343',
			light: '#DA6868',
			dark: '#922E2E',
			contrastText: '#FFFFFF',
		},
		text: {
			primary: '#121828',
			secondary: '#65748B',
			disabled: 'rgba(55, 65, 81, 0.48)',
		},
		generos: {
			main: '#f50057',
			primary: '#2196f3',
			secondary: '#f50057',
		},
	},
	shape: {
		borderRadius: 8,
	},
	shadows: [
		'none',
		'0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
		'0px 1px 2px rgba(100, 116, 139, 0.12)',
		'0px 1px 4px rgba(100, 116, 139, 0.12)',
		'0px 1px 5px rgba(100, 116, 139, 0.12)',
		'0px 1px 6px rgba(100, 116, 139, 0.12)',
		'0px 2px 6px rgba(100, 116, 139, 0.12)',
		'0px 3px 6px rgba(100, 116, 139, 0.12)',
		'0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
		'0px 5px 12px rgba(100, 116, 139, 0.12)',
		'0px 5px 14px rgba(100, 116, 139, 0.12)',
		'0px 5px 15px rgba(100, 116, 139, 0.12)',
		'0px 6px 15px rgba(100, 116, 139, 0.12)',
		'0px 7px 15px rgba(100, 116, 139, 0.12)',
		'0px 8px 15px rgba(100, 116, 139, 0.12)',
		'0px 9px 15px rgba(100, 116, 139, 0.12)',
		'0px 10px 15px rgba(100, 116, 139, 0.12)',
		'0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
		'0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
		'0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
		'0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
		'0px 25px 50px rgba(100, 116, 139, 0.25)',
		'0px 25px 50px rgba(100, 116, 139, 0.25)',
		'0px 25px 50px rgba(100, 116, 139, 0.25)',
		'0px 25px 50px rgba(100, 116, 139, 0.25)',
	],
	typography: {
		fontSize: 13,
		fontWeight: 500,
		button: {
			fontSize: 14,
			fontWeight: 600,
		},
		typography: {
			fontFamily: 'font-medium',
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: `
					@font-face {
						font-family: 'Raleway';
						font-style: normal;
						font-display: swap;
						font-weight: 400;
					}
				`,
			},
		},
	},
});
