import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';

import logo from '../../assets/Logo.png';
import Copyright from '../../componentes/CopyRight';
import TextField from '../../componentes/TextField';

const Login = () => {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		});
	};
	return (
		<div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<Box className='max-w-md w-full'>
				<img src={logo} className='mx-auto h-24 w-auto' />
				<h1 className='mt-6 text-center text-xl tracking-tight'>
					Iniciar Sessión
				</h1>
				<Box
					component='form'
					onSubmit={handleSubmit}
					noValidate
					className='mt-8 space-y-6'
				>
					<TextField
						textLabel='Usuario'
						name='nombreCorto'
						placeHolder='Usuario'
						value={''}
						onChange={() => {}}
						isHandleChange
						required
						error={''}
					/>
					<TextField
						textLabel='Contraseña'
						name='nombreCorto'
						placeHolder='Contraseña'
						value={''}
						onChange={() => {}}
						isHandleChange
						required
						error={''}
					/>
					<div className='flex items-center mb-4'>
						<input
							id='default-checkbox'
							type='checkbox'
							value=''
							className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
						<label
							for='default-checkbox'
							className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
						>
							Recuerdame
						</label>
					</div>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						className='bg-black'
						sx={{ mt: 3, mb: 2 }}
					>
						Iniciar
					</Button>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Box>
		</div>
	);
};
export default Login;
