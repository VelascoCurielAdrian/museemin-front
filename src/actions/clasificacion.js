import { gql } from '@apollo/client';

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
	mutation CrearClasificacion($input: clasificacionDatos!) {
		createClasificacion(input: $input) {
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

export const ClasificacionActions = {
	CREATE,
	DELETE,
	GET,
};
