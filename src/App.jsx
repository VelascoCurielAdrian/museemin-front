import { ThemeProvider } from '@mui/material';
import DashBoard from './componentes/DashBoard';
import { Router } from 'react-router-dom';
// import history from './configuracion/Routes/history';
// import Routes from './configuracion/Routes';
import { theme } from './configuracion/theme';
import Login from './paginas/Login/LoginV2';

function App() {
	return (
		<div className='App'>
			{/* <Router history={his}> */}
			<ThemeProvider theme={theme}>
				<Login />
			</ThemeProvider>
			{/* </Router> */}
		</div>
	);
}

export default App;
