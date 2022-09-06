import { gql } from '@apollo/client';
import * as yup from 'yup';

export const accion = gql`
	mutation AuthenticarUsuario($input: UsuarioAuth!) {
		authenticarUsuario(input: $input) {
			token
		}
	}
`;

export const validacion = yup.object({
	usuario: yup
    .string('Ecriba el usuario')
    .required('El usuario es requerido'),
	password: yup
		.string('Escriba la contraseña')
		.required('La contraseña es requerida'),
});
