import { ThemeProvider } from '@mui/material';
import { AuthProvider } from './configuracion/auth';
import { AppRouter } from './configuracion/Routes/appRouter';
import { theme } from './configuracion/theme';

export const App = () => {
	return (
		<div className='App'>
			<AuthProvider>
				<ThemeProvider theme={theme}>
					<AppRouter />
				</ThemeProvider>
			</AuthProvider>
		</div>
	);
};
