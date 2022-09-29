import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Box, Checkbox, FormControlLabel } from '@mui/material';

import logo from '../../../assets/Logo.png';
import { parseError } from '../../../helpers';
import Button from '../../../componentes/Button';
import TexField from '../../../componentes/TextField';
import Copyright from '../../../componentes/CopyRight';

import { accion, validacion } from './helper';
import { useContext } from 'react';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';

const input = {
	usuario: '',
	password: '',
};

export const Login = () => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [Authenticate, { loading }] = useMutation(accion, {
		onCompleted: async (data) => {
			const lastPath = localStorage.getItem('lastPath') || '/';
			login(`${data.authenticarUsuario?.token}`);
			navigate(lastPath, {
				replace: true,
			});
		},
		onError: (e) => {
			const parseErrors = parseError(e);
			parseErrors.forEach(({ message, name }) => {
				if (name === 'BAD_USER_INPUT') {
					toast.error(`${Object.values(message)}`);
				}
			});
		},
	});
	const formik = useFormik({
		initialValues: input,
		validationSchema: validacion,
		onSubmit: (values) => {
			const input = {
				usuario: values.usuario,
				password: values.password,
			};
			Authenticate({ variables: { input } });
		},
	});
	return (
		<div className='h-full w-full flex items-center justify-center py-20 px-6 sm:px-6 lg:px-8'>
			<Box className='max-w-md w-full'>
				<img src={logo} className='mx-auto h-32 w-auto' />
				<form onSubmit={formik.handleSubmit} className='mt-8 space-y-5'>
					<TexField
						fullWidth
						id='usuario'
						name='usuario'
						label='Usuario'
						autoFocus
						value={formik.values.usuario}
						onChange={formik.handleChange}
						helperText={formik.touched.usuario && formik.errors.usuario}
						error={formik.touched.usuario && Boolean(formik.errors.usuario)}
					/>
					<TexField
						fullWidth
						id='password'
						name='password'
						type='password'
						label='Contraseña'
						value={formik.values.password}
						onChange={formik.handleChange}
						helperText={formik.touched.password && formik.errors.password}
						error={formik.touched.password && Boolean(formik.errors.password)}
					/>
					<FormControlLabel
						className='text-gray-500 dark:text-gray-400'
						control={<Checkbox onChange={formik.handleChange} />}
						label='Recuerdame'
					/>
					<Button label='Iniciar Sessión' isSubmit loading={loading} fullWidth/>
				</form>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Box>
		</div>
	);
};
