import { gql } from '@apollo/client';
import * as yup from 'yup';
import {
	EMAIL_INVALID,
	MESSAGE_REQUIRED,
	TELEPHONE_INVALID,
	TELEPHONE_VALIDATE,
} from '../helpers/constants';

const FRAGMENTS = {
	Cliente: gql`
		fragment data on cliente {
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
	`,
};

const CREATE = gql`
	mutation CreateCliente($input: clienteDatos!) {
		createCliente(input: $input) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Cliente}
`;

const UPDATE = gql`
	mutation UpdateCliente($input: clienteDatos!, $updateId: ID!) {
		updateCliente(id: $updateId, input: $input) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Cliente}
`;

const DELETE = gql`
	mutation DeleteCliente($deleteClienteId: ID) {
		deleteCliente(id: $deleteClienteId) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Cliente}
`;

const GET = gql`
	query GetAllCliente($offset: Int, $limit: Int, $txtBusqueda: String) {
		getAllCliente(offset: $offset, limit: $limit, txtBusqueda: $txtBusqueda) {
			count
			rows {
				...data
			}
		}
	}
	${FRAGMENTS.Cliente}
`;

const GET_BYID = gql`
	query GetCliente($getClienteId: ID!) {
		getCliente(id: $getClienteId) {
			...data
		}
	}
	${FRAGMENTS.Cliente}
`;

export const Validate = yup.object({
	nombre: yup.string().required(MESSAGE_REQUIRED),
	primerTelefono: yup
		.number(TELEPHONE_INVALID)
		.min(10, TELEPHONE_VALIDATE)
		.required(MESSAGE_REQUIRED),
	segundoTelefono: yup
		.number(TELEPHONE_INVALID)
		.min(10, TELEPHONE_VALIDATE)
		.required(MESSAGE_REQUIRED),
	correo: yup.string().email(EMAIL_INVALID).required(MESSAGE_REQUIRED),
	colonia: yup.string().required(MESSAGE_REQUIRED),
	referencia: yup.string().required(MESSAGE_REQUIRED),
	calles: yup.string().required(MESSAGE_REQUIRED),
	estatus: yup.string().required(MESSAGE_REQUIRED),
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

export const ClientesActions = {
	GET_BYID,
	CREATE,
	DELETE,
	UPDATE,
	GET,
};
