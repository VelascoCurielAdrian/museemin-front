import React from 'react';
import ReactDOM from 'react-dom/client';
import bgLocale from 'date-fns/locale/es';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import './index.css';
import { App } from './App';
import client from './configuracion/apollo';
import Snackbar from './componentes/SnackBar';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					adapterLocale={bgLocale}
				>
					<App />
					<Snackbar />
				</LocalizationProvider>
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>,
);
