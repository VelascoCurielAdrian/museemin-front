import { gql } from '@apollo/client';
import * as yup from 'yup';
import { MESSAGE_REQUIRED } from '../helpers/constants';

const FRAGMENTS = {
	Clasificacion: gql`
		fragment data on clasificacion {
			id
			descripcion
			usuarioRegistroID
			activo
			estatus
		}
	`,
};

const CREATE = gql`
	mutation CrearClasificacion($descripcion: String!) {
		createClasificacion(input: { descripcion: $descripcion }) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Clasificacion}
`;

const DELETE = gql`
	mutation eliminarClasificacion($deleteClasificacionId: ID) {
		deleteClasificacion(id: $deleteClasificacionId) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Clasificacion}
`;

const UPDATE = gql`
	mutation actualizarClasificacion($updateID: ID!, $descripcion: String!) {
		updateClasificacion(id: $updateID, input: { descripcion: $descripcion }) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Clasificacion}
`;

const GET = gql`
	query obtenerClasificaciones($offset: Int, $limit: Int) {
		getAllCountClasificacion(offset: $offset, limit: $limit) {
			count
			rows {
				...data
			}
		}
	}
	${FRAGMENTS.Clasificacion}
`;

const GET_BYID = gql`
	query obtenerClasificacion($id: ID!) {
		getClasificacion(id: $id) {
			...data
		}
	}
	${FRAGMENTS.Clasificacion}
`;

export const Validate = yup.object({
	descripcion: yup.string().required(MESSAGE_REQUIRED)
});

export const ClasificacionActions = {
	CREATE,
	DELETE,
	UPDATE,
	GET,
	GET_BYID,
};
