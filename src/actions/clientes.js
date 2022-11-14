import { gql } from '@apollo/client';
import { isBoolean } from 'lodash';
import * as yup from 'yup';
import {
	EMAIL_INVALID,
	MESSAGE_REQUIRED,
	TELEPHONE_INVALID,
	TELEPHONE_VALIDATE,
	ZIP_CODE,
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
	mutation CreateCliente(
		$nombre: String!
		$primerTelefono: String!
		$segundoTelefono: String!
		$correo: String!
		$colonia: String
		$calles: String
		$referencia: String
		$numeroExterior: Int
		$numeroInterior: Int
		$codigoPostal: Int
		$estatus: Boolean!
	) {
		createCliente(
			input: {
				nombre: $nombre
				primerTelefono: $primerTelefono
				segundoTelefono: $segundoTelefono
				correo: $correo
				colonia: $colonia
				calles: $calles
				referencia: $referencia
				numeroExterior: $numeroExterior
				numeroInterior: $numeroInterior
				codigoPostal: $codigoPostal
				estatus: $estatus
			}
		) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Cliente}
`;

const UPDATE = gql`
	mutation UpdateCliente(
		$nombre: String!
		$primerTelefono: String!
		$segundoTelefono: String!
		$correo: String!
		$colonia: String
		$calles: String
		$referencia: String
		$numeroExterior: Int
		$numeroInterior: Int
		$codigoPostal: Int
		$estatus: Boolean!
		$updateID: ID!
	) {
		updateCliente(
			id: $updateID
			input: {
				nombre: $nombre
				primerTelefono: $primerTelefono
				segundoTelefono: $segundoTelefono
				correo: $correo
				colonia: $colonia
				calles: $calles
				referencia: $referencia
				numeroExterior: $numeroExterior
				numeroInterior: $numeroInterior
				codigoPostal: $codigoPostal
				estatus: $estatus
			}
		) {
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
	query GetCliente($id: ID!) {
		getCliente(id: $id) {
			...data
		}
	}
	${FRAGMENTS.Cliente}
`;

export const Validate = yup.object({
	nombre: yup.string().required(MESSAGE_REQUIRED),
	primerTelefono: yup
		.string()
		.required(MESSAGE_REQUIRED)
		.min(10, TELEPHONE_VALIDATE)
		.max(10, TELEPHONE_VALIDATE),
	segundoTelefono: yup
		.string()
		.required(MESSAGE_REQUIRED)
		.min(10, TELEPHONE_VALIDATE)
		.max(10, TELEPHONE_VALIDATE),
	correo: yup.string().email(EMAIL_INVALID).required(MESSAGE_REQUIRED),
	colonia: yup.string().required(MESSAGE_REQUIRED),
	referencia: yup.string().required(MESSAGE_REQUIRED),
	calles: yup.string().required(MESSAGE_REQUIRED),
	estatus: yup.boolean(),
	codigoPostal: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required(MESSAGE_REQUIRED)
		.min(6, ZIP_CODE)
		.max(6, ZIP_CODE),
	numeroExterior: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required(MESSAGE_REQUIRED),
	numeroInterior: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required(MESSAGE_REQUIRED),
});

export const ClientesActions = {
	GET_BYID,
	CREATE,
	DELETE,
	UPDATE,
	GET,
};
