import React from 'react';
import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import client from './configuracion/apollo';
import 'react-toastify/dist/ReactToastify.css';
import { App } from './App';
import './index.css';
import ToasCustomized from './componentes/Toast';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<ToasCustomized />
				<App />
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
