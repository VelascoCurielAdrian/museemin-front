import { gql } from '@apollo/client';
import * as yup from 'yup';
import {
	EMAIL_INVALID,
	MESSAGE_REQUIRED,
	TELEPHONE_VALIDATE,
} from '../helpers/constants';

const FRAGMENTS = {
	Trabajadores: gql`
		fragment data on trabajador {
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
	`,
};

const CREATE = gql`
	mutation CrearTrabajador(
		$nombres: String!
		$primerApellido: String!
		$segundoApellido: String!
		$sexo: String!
		$telefono: String!
		$correo: String!
		$colonia: String
		$calles: String
		$referencia: String
		$numeroExterior: String
		$usuarioRegistroID: ID
		$estatus: Boolean!
	) {
		createTrabajador(
			input: {
				nombres: $nombres
				primerApellido: $primerApellido
				segundoApellido: $segundoApellido
				telefono: $telefono
				correo: $correo
				colonia: $colonia
				referencia: $referencia
				calles: $calles
				usuarioRegistroID: $usuarioRegistroID
				estatus: $estatus
				sexo: $sexo
				numeroExterior: $numeroExterior
			}
		) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Trabajadores}
`;

const UPDATE = gql`
	mutation actualizarTrabajador(
		$nombres: String!
		$primerApellido: String!
		$segundoApellido: String!
		$sexo: String!
		$telefono: String!
		$correo: String!
		$colonia: String
		$calles: String
		$referencia: String
		$numeroExterior: String
		$usuarioRegistroID: ID
		$estatus: Boolean!
		$updateID: ID!
	) {
		updateTrabajador(
			id: $updateID
			input: {
				nombres: $nombres
				primerApellido: $primerApellido
				segundoApellido: $segundoApellido
				telefono: $telefono
				correo: $correo
				colonia: $colonia
				referencia: $referencia
				calles: $calles
				usuarioRegistroID: $usuarioRegistroID
				estatus: $estatus
				sexo: $sexo
				numeroExterior: $numeroExterior
			}
		) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Trabajadores}
`;

const DELETE = gql`
	mutation EliminarTrabajador($deleteId: ID) {
		deleteTrabajador(id: $deleteId) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Trabajadores}
`;

const GET = gql`
	query ObtenerTrabajadores($offset: Int, $limit: Int, $txtBusqueda: String) {
		getAllTrabajador(
			offset: $offset
			limit: $limit
			txtBusqueda: $txtBusqueda
		) {
			count
			rows {
				...data
			}
		}
	}
	${FRAGMENTS.Trabajadores}
`;

const GET_BYID = gql`
	query Trabajador($id: ID!) {
		getTrabajador(id: $id) {
			...data
		}
	}
	${FRAGMENTS.Trabajadores}
`;

export const Validate = yup.object({
	correo: yup.string().email(EMAIL_INVALID).required(MESSAGE_REQUIRED),
	primerApellido: yup.string().required(MESSAGE_REQUIRED),
	segundoApellido: yup.string().required(MESSAGE_REQUIRED),
	referencia: yup.string().required(MESSAGE_REQUIRED),
	colonia: yup.string().required(MESSAGE_REQUIRED),
	nombres: yup.string().required(MESSAGE_REQUIRED),
	estatus: yup.boolean(),
	calles: yup.string().required(MESSAGE_REQUIRED),
	sexo: yup.string().required(MESSAGE_REQUIRED),
	numeroExterior: yup
		.string()
		.required(MESSAGE_REQUIRED),
	telefono: yup
		.string()
		.required(MESSAGE_REQUIRED)
		.min(10, TELEPHONE_VALIDATE)
		.max(10, TELEPHONE_VALIDATE),
});

export const TrabajadoresActions = {
	GET_BYID,
	CREATE,
	DELETE,
	UPDATE,
	GET,
};
