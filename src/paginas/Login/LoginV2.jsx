import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { RiLockPasswordLine } from 'react-icons/ri';
import InputAdornment from '@mui/material/InputAdornment';
import { FaRegUserCircle } from 'react-icons/fa';
import * as yup from 'yup';
import TexFieldV2 from '../../componentes/TextField/texFieldV2';
import Copyright from '../../componentes/CopyRight';
import CheckBox from '../../componentes/CheckBox';
import TextField from '../../componentes/TextField';
import logo from '../../assets/Logo.png';
import Button from '../../componentes/Button';

const validationSchema = yup.object({
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string('Enter your password')
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required'),
});

const Login = () => {
	const formik = useFormik({
		initialValues: {
			email: 'foobar@example.com',
			password: 'foobar',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<Box className='max-w-md w-full'>
				<img src={logo} className='mx-auto h-24 w-auto' />
				<form onSubmit={formik.handleSubmit} className='mt-8 space-y-5'>
					<TexFieldV2
						inputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<FaRegUserCircle
										size={18}
										className='text-gray-500 dark:text-gray-400'
									/>
								</InputAdornment>
							),
						}}
						fullWidth
						id='email'
						name='email'
						label='Email'
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
					<TexFieldV2
						inputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<RiLockPasswordLine
										size={18}
										className='text-gray-500 dark:text-gray-400'
									/>
								</InputAdornment>
							),
						}}
						fullWidth
						id='password'
						name='password'
						label='Password'
						type='password'
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					<CheckBox label='Recuerdame' />
					<Button label='Iniciar Sessión' isSubmit />
				</form>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Box>
		</div>
	);
};

export default Login;
