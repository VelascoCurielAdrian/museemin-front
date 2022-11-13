import { gql } from '@apollo/client';
import * as yup from 'yup';
import { MESSAGE_REQUIRED } from '../helpers/constants';

const FRAGMENTS = {
	Herramienta: gql`
		fragment data on herramienta {
			id
			nombre
			descripcion
			precio
			marca
			estado
			usuarioRegistroID
			clasificacionID
			clasificacion {
				id
				descripcion
				usuarioRegistroID
				activo
				estatus
			}
			activo
			estatus
		}
	`,
};

const CREATE = gql`
	mutation CreateHerramienta(
		$nombre: String!
		$descripcion: String!
		$marca: String!
		$estado: Int!
		$precio: Float!
		$usuarioRegistroID: ID
		$clasificacionID: ID!
		$estatus: Boolean!
	) {
		createHerramienta(
			input: {
				nombre: $nombre
				descripcion: $descripcion
				marca: $marca
				estado: $estado
				precio: $precio
				usuarioRegistroID: $usuarioRegistroID
				clasificacionID: $clasificacionID
				estatus: $estatus
			}
		) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Herramienta}
`;

const UPDATE = gql`
	mutation UpdateHerramienta(
		$updateID: ID!
		$nombre: String!
		$descripcion: String!
		$marca: String!
		$estado: Int!
		$precio: Float!
		$usuarioRegistroID: ID
		$clasificacionID: ID!
		$estatus: Boolean!
	) {
		updateHerramienta(
			id: $updateID
			input: {
				nombre: $nombre
				descripcion: $descripcion
				marca: $marca
				estado: $estado
				precio: $precio
				usuarioRegistroID: $usuarioRegistroID
				clasificacionID: $clasificacionID
				estatus: $estatus
			}
		) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Herramienta}
`;

const DELETE = gql`
	mutation Mutation($deleteHerramientaId: ID) {
		deleteHerramienta(id: $deleteHerramientaId) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Herramienta}
`;

const GET = gql`
	query GetAllHerramientas($offset: Int, $limit: Int, $txtBusqueda: String) {
		getAllHerramientas(
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
	${FRAGMENTS.Herramienta}
`;

const GET_BYID = gql`
	query GetHerramienta($id: ID!) {
		getHerramienta(id: $id) {
			...data
		}
	}
	${FRAGMENTS.Herramienta}
`;

export const Validate = yup.object({
	clasificacionID: yup.string().required(MESSAGE_REQUIRED),
	nombre: yup.string().required(MESSAGE_REQUIRED),
	marca: yup.string().required(MESSAGE_REQUIRED),
	estado: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required(MESSAGE_REQUIRED),
	precio: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required(MESSAGE_REQUIRED),
	estatus: yup.bool(),
	descripcion: yup.string().required(MESSAGE_REQUIRED),
});

export const HerramientasActions = {
	GET_BYID,
	CREATE,
	DELETE,
	UPDATE,
	GET,
};
