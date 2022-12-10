import { gql } from '@apollo/client';
import * as yup from 'yup';

export const dataCache = 'getAllTipoServicios';
export const validacion = yup.object({
	nombre: yup.string('Ecriba el nombre').required('El nombre es requerido'),
});

const CREATE = gql`
	mutation CreateTipoServicio($input: TipoServicioDatos!) {
		createTipoServicio(input: $input) {
			mensaje
			respuesta {
				id
				descripcion
				usuarioRegistroID
				activo
				estatus
			}
		}
	}
`;

const UPDATE = gql`
	mutation UpdateTipoServicio(
		$updateTipoServicioId: ID!
		$input: TipoServicioDatos!
	) {
		updateTipoServicio(id: $updateTipoServicioId, input: $input) {
			mensaje
			respuesta {
				id
				descripcion
				usuarioRegistroID
				activo
				estatus
			}
		}
	}
`;

const DELETE = gql`
	mutation DeleteTipoServicio($deleteTipoServicioId: ID) {
		deleteTipoServicio(id: $deleteTipoServicioId) {
			mensaje
			respuesta {
				id
				descripcion
				usuarioRegistroID
				activo
				estatus
			}
		}
	}
`;

const GET = gql`
	query Query($offset: Int, $limit: Int) {
		getAllTipoServicios(offset: $offset, limit: $limit) {
			count
			rows {
				id
				descripcion
				usuarioRegistroID
				activo
				estatus
			}
		}
	}
`;

const exportedObject = {
	CREATE,
	UPDATE,
	DELETE,
	GET,
};

export default exportedObject;
