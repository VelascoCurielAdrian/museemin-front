import { gql } from "@apollo/client";
import * as yup from "yup";

export const dataCache = "getAllCountClasificacion";

export const validacion = yup.object({
	nombre: yup.string("Ecriba el nombre").required("El nombre es requerido"),
});

const CREATE = gql`
	mutation CrearClasificacion($input: clasificacionDatos!) {
		createClasificacion(input: $input) {
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
	query obtenerClasificaciones($offset: Int, $limit: Int) {
		getAllCountClasificacion(offset: $offset, limit: $limit) {
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
	GET,
};

export default exportedObject;
