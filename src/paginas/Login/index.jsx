import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaRegUserCircle } from 'react-icons/fa';
import Box from '@mui/material/Box';

import Copyright from '../../componentes/CopyRight';
import TextField from '../../componentes/TextField';
import CheckBox from '../../componentes/CheckBox';
import Button from '../../componentes/Button';
import logo from '../../assets/Logo.png';
import { parseError } from '../../helpers';

const AUTHENTICATION = gql`
	mutation AuthenticarUsuario($input: UsuarioAuth!) {
		authenticarUsuario(input: $input) {
			token
		}
	}
`;

const Login = () => {
	const [datosUsuario, setDatosUsuario] = useState({
		usuario: '',
		password: '',
		mantenerSesion: false,
	});
	const [error, setError] = useState({});

	const [Authenticate, { loading }] = useMutation(AUTHENTICATION, {
		onCompleted: async (data) => {
			await localStorage.setItem('token', `${data.authenticarUsuario?.token}`);
		},
		onError: (e) => {
			const parseErrors = parseError(e);
			parseErrors.forEach((el) => {
				if (el.name === 'BAD_USER_INPUT') {
					setError({ mensaje: el.message, estatus: 'error' });
				} else {
					console.log(el.message);
				}
			});
		},
	});
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(datosUsuario);
		const input = {
			usuario: datosUsuario.usuario,
			password: datosUsuario.password,
		};
		Authenticate({ variables: { input } });
	};

	if (loading) return <h1>Cargando</h1>;

	return (
		<div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<Box className='max-w-md w-full'>
				<img src={logo} className='mx-auto h-24 w-auto' />
				<Box
					component='form'
					onSubmit={handleSubmit}
					noValidate
					className='mt-8 space-y-6'
				>
					<TextField
						iconCustomized={
							<FaRegUserCircle className=' tw-5 h-5 text-gray-500 dark:text-gray-400' />
						}
						placeHolder='Usuario'
						name='usuario'
						label='Usuario'
						isHandleChange
						required
						showIcon
						onChange={setDatosUsuario}
						value={datosUsuario.usuario}
						error={error}
					/>
					<TextField
						iconCustomized={
							<RiLockPasswordLine className='w-5 h-5 text-gray-500 dark:text-gray-400' />
						}
						placeHolder='contraseña'
						label='Contraseña'
						name='password'
						value={datosUsuario.password}
						required
						showIcon
						onChange={setDatosUsuario}
						isHandleChange
						error={error.password}
					/>
					<CheckBox label='Recuerdame' />
					<Button label='Iniciar Sessión' isSubmit />
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Box>
		</div>
	);
};
export default Login;
