import { ThemeProvider } from '@mui/material';
import DashBoard from './componentes/DashBoard';
import { Router } from 'react-router-dom';
// import history from './configuracion/Routes/history';
// import Routes from './configuracion/Routes';
import SignInSide from './paginas/Login';
import { theme } from './configuracion/theme';

function App() {
	return (
		<div className='App'>
			{/* <Router history={his}> */}
			<ThemeProvider theme={theme}>
				<SignInSide />
			</ThemeProvider>
			{/* </Router> */}
		</div>
	);
}

export default App;
