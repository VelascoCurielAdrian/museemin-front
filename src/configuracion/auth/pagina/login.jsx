import { useMutation } from '@apollo/client';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import logo from '../../../assets/Logo.png';
import { parseError } from '../../../helpers';
import Button from '../../../componentes/Button';
import Copyright from '../../../componentes/CopyRight';

import { accion, validacion } from './helper';
import { useContext } from 'react';
import { AuthContext } from '../context';
import { TextFieldController } from '../../../componentes/Formulario';
import { snackbar } from '../../apollo/cache';

const defaultSnackbar = { isOpen: true, time: 3000 };
const input = {
	usuario: '',
	password: '',
};

export const Login = () => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [Authenticate, { loading }] = useMutation(accion, {
		onCompleted: async (response) => {
			console.log(response);
			const lastPath = localStorage.getItem('lastPath') || '/';
			login(`${response.authenticarUsuario?.token}`);
			navigate(lastPath, {
				replace: true,
			});
			snackbar({
				...defaultSnackbar,
				label: Object.values(response)[0].mensaje,
				severity: 'success',
			});
		},
		onError: (e) => {
			const parseErrors = parseError(e);
			parseErrors.forEach(({ message, name }) => {
				if (name === 'BAD_USER_INPUT') {
					snackbar({
						...defaultSnackbar,
						label: Object.values(message),
						severity: 'error',
					});
				}
			});
		},
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validacion),
		defaultValues: input,
	});

	const onSubmit = (data) => {
		const input = {
			usuario: data.usuario,
			password: data.password,
		};
		Authenticate({ variables: { input } });
	};

	return (
		<div className="h-full w-full flex items-center justify-center py-20 px-6 sm:px-6 lg:px-8">
			<Box className="max-w-md w-full">
				<img src={logo} className="mx-auto h-32 w-auto" />
				<form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
					<TextFieldController
						control={control}
						name="usuario"
						error={errors.usuario}
						label="Usuario"
					/>
					<TextFieldController
						control={control}
						name="password"
						type="password"
						error={errors.password}
						label="Contraseña"
					/>
					<FormControlLabel
						className="text-gray-500 dark:text-gray-400"
						control={<Checkbox onChange={() => {}} />}
						label="Recuerdame"
					/>
					<Button
						label="Iniciar Sessión"
						isSubmit
						loading={loading}
						showLoading
						fullWidth
					/>
				</form>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Box>
		</div>
	);
};
