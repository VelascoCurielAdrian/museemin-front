import { ThemeProvider } from '@mui/material';
import SignInSide from './paginas/Login';
import { theme } from './configuracion/theme';
function App() {
	return (
		<ThemeProvider theme={theme}>
			<SignInSide />
		</ThemeProvider>
	);
}

export default App;
