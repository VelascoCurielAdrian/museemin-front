import * as React from 'react';
import Box from '@mui/material/Box';
import logo from '../../assets/Logo.png';
import Copyright from '../../componentes/CopyRight';
import TextField from '../../componentes/TextField';
import Button from '../../componentes/Button';

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
		<div className='container:mx-auto min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-700'>
			<Box className='max-w-md w-full'>
				<img src={logo} className='mx-auto h-24 w-auto' />
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
					<label
						for='input-group-1'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
					>
						Your Email
					</label>
					<div className='relative mb-6'>
						<div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
							<svg
								aria-hidden='true'
								className='w-5 h-5 text-gray-500 dark:text-gray-400'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'></path>
								<path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'></path>
							</svg>
						</div>
						<input
							type='text'
							id='input-group-1'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='name@flowbite.com'
						/>
					</div>
					<div className='flex items-center mb-4'>
						<input
							id='default-checkbox'
							type='checkbox'
							value=''
							className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
						<label
							for='default-checkbox'
							className='ml-1 text-sm font-medium text-gray-900 dark:text-gray-300'
						>
							Recuerdame
						</label>
					</div>
					<Button label='Iniciar Sessión' />
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Box>
		</div>
	);
};
export default Login;
