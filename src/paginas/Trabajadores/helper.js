import { gql } from '@apollo/client';
import * as yup from 'yup';

export const dataCache = 'getAllTrabajador';
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validacion = yup.object({
	nombres: yup.string().required('Este Campo es requerido'),
	primerApellido: yup.string().required('Este Campo es requerido'),
	segundoApellido: yup.string().required('Este Campo es requerido'),
	sexo: yup.string().required('Este Campo es requerido'),
	telefono: yup
		.string()
		.max(10, 'telefono debe tener como minimo 10 caracteres')
		.matches(phoneRegExp, 'Numero de telefono invalido')
		.required('Este Campo es requerido'),
	correo: yup
		.string()
		.email('Correo electronico invalido')
		.required('Este Campo es requerido'),
	colonia: yup.string().required('Este Campo es requerido'),
	referencia: yup.string().required('Este Campo es requerido'),
	calles: yup.string().required('Este Campo es requerido'),
	estatus: yup.string().required('Este Campo es requerido'),
	numeroExterior: yup
		.string()
		.min(4, 'debe tener como minimo 4 caracteres')
		.max(4, 'debe tener como maximo 4 caracteres')
		.required('Este Campo es requerido'),
});

export const estatus = [
	{ id: true, nombre: 'Activo' },
	{ id: false, nombre: 'Inactivo' },
];

export const Generos = [
	{ id: 'M', nombre: 'Masculino' },
	{ id: 'F', nombre: 'Femenino' },
];

const CREATE = gql`
	mutation CrearTrabajador($input: trabajadorDatos!) {
		createTrabajador(input: $input) {
			mensaje
			respuesta {
				id
				nombres
				primerApellido
				segundoApellido
				sexo
				telefono
				correo
				colonia
				calles
				referencia
				numeroExterior
				usuarioRegistroID
				estatus
			}
		}
	}
`;

const UPDATE = gql`
	mutation actualizarTrabajador($input: trabajadorDatos!, $updateId: ID!) {
		updateTrabajador(id: $updateId, input: $input) {
			mensaje
			respuesta {
				id
				nombres
				primerApellido
				segundoApellido
				sexo
				telefono
				correo
				colonia
				calles
				referencia
				numeroExterior
				usuarioRegistroID
				estatus
			}
		}
	}
`;

const DELETE = gql`
	mutation EliminarTrabajador($deleteId: ID) {
		deleteTrabajador(id: $deleteId) {
			mensaje
			respuesta {
				id
				nombres
				primerApellido
				segundoApellido
				sexo
				telefono
				correo
				colonia
				calles
				referencia
				numeroExterior
				usuarioRegistroID
				estatus
			}
		}
	}
`;

const GET = gql`
	query ObtenerTrabajadores($offset: Int, $limit: Int) {
		getAllTrabajador(offset: $offset, limit: $limit) {
			count
			rows {
				id
				nombres
				primerApellido
				segundoApellido
				sexo
				telefono
				correo
				colonia
				calles
				referencia
				numeroExterior
				usuarioRegistroID
				estatus
			}
		}
	}
`;
const GET_BYID = gql`
	query Trabajador($trabajadorId: ID!) {
		getTrabajador(id: $trabajadorId) {
			id
			nombres
			primerApellido
			segundoApellido
			sexo
			telefono
			correo
			colonia
			calles
			estatus
			referencia
			numeroExterior
		}
	}
`;

const exportedObject = {
	GET_BYID,
	CREATE,
	UPDATE,
	DELETE,
	GET,
};

export default exportedObject;
