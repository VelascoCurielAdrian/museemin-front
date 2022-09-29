import { gql } from '@apollo/client';
import * as yup from 'yup';

export const dataCache = 'getAllCliente';

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validacion = yup.object({
	nombre: yup.string().required('Este Campo es requerido'),
	primerTelefono: yup
		.string()
		.max(10, 'telefono debe tener como minimo 10 caracteres')
		.matches(phoneRegExp, 'Numero de telefono invalido')
		.required('Este Campo es requerido'),
	segundoTelefono: yup
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
	codigoPostal: yup
		.string()
		.required('Este Campo es requerido')
		.min(6, 'Este campo ddebe tener como minimo 6 caracteres'),
	numeroExterior: yup
		.string()
		.required('Este Campo es requerido')
		.min(4, 'Este campo ddebe tener como minimo 4 caracteres'),
	numeroInterior: yup
		.string()
		.required('Este Campo es requerido')
		.min(4, 'Este campo ddebe tener como minimo 4 caracteres'),
});

export const estatus = [
	{ id: true, nombre: 'Activo' },
	{ id: false, nombre: 'Inactivo' },
];

const CREATE = gql`
	mutation CreateCliente($input: clienteDatos!) {
		createCliente(input: $input) {
			mensaje
			respuesta {
				id
				nombre
				primerTelefono
				segundoTelefono
				correo
				colonia
				calles
				referencia
				numeroExterior
				numeroInterior
				codigoPostal
				usuarioRegistroID
				activo
				estatus
			}
		}
	}
`;

const UPDATE = gql`
	mutation UpdateCliente($input: clienteDatos!, $updateId: ID!) {
		updateCliente(id: $updateId, input: $input) {
			mensaje
			respuesta {
				id
				nombre
				primerTelefono
				segundoTelefono
				correo
				colonia
				calles
				referencia
				numeroExterior
				numeroInterior
				codigoPostal
				usuarioRegistroID
				activo
				estatus
			}
		}
	}
`;

const DELETE = gql`
	mutation DeleteCliente($deleteClienteId: ID) {
		deleteCliente(id: $deleteClienteId) {
			mensaje
			respuesta {
				id
				nombre
				primerTelefono
				segundoTelefono
				correo
				colonia
				calles
				referencia
				numeroExterior
				numeroInterior
				codigoPostal
				usuarioRegistroID
				activo
				estatus
			}
		}
	}
`;

const GET = gql`
	query GetAllCliente($offset: Int, $limit: Int) {
		getAllCliente(offset: $offset, limit: $limit) {
			count
			rows {
				id
				nombre
				primerTelefono
				segundoTelefono
				correo
				colonia
				calles
				referencia
				numeroExterior
				numeroInterior
				codigoPostal
				usuarioRegistroID
				activo
				estatus
			}
		}
	}
`;
const GET_BYID = gql`
	query GetCliente($getClienteId: ID!) {
		getCliente(id: $getClienteId) {
			id
			nombre
			primerTelefono
			segundoTelefono
			correo
			colonia
			calles
			referencia
			numeroExterior
			numeroInterior
			codigoPostal
			usuarioRegistroID
			activo
			estatus
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
