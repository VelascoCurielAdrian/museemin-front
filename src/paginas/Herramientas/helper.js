import { gql } from "@apollo/client";
import * as yup from "yup";

export const dataCache = "getAllHerramientas";

export const validacion = yup.object({
	clasificacionID: yup.string().required("La clasificación es requerida"),
	nombre: yup.string().required("El nombre es requerido"),
	marca: yup.string().required("La marca es requerida"),
	estadoID: yup.string().required("El estado es requerido"),
	precio: yup.string().required("El precio es requerido"),
	estatusID: yup.string().required("El estatus es requerido"),
	descripcion: yup.string().required("La descripcion es requerida"),
});

export const estatus = [
	{ id: 1, nombre: "Activo" },
	{ id: 2, nombre: "Inactivo" },
];

export const estadoHerramienta = [
	{ id: 1, nombre: "Nuevo" },
	{ id: 2, nombre: "Usado" },
	{ id: 3, nombre: "Dañado" },
];

const CREATE = gql`
	mutation CreateHerramienta($input: herramientaDatos!) {
		createHerramienta(input: $input) {
			mensaje
			respuesta {
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
		}
	}
`;

const GET = gql`
	query GetAllHerramientas($offset: Int, $limit: Int) {
		getAllHerramientas(offset: $offset, limit: $limit) {
			count
			rows {
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
		}
	}
`;

const GET_CLASIFICACION = gql`
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
	GET_CLASIFICACION,
	CREATE,
	GET,
};

export default exportedObject;
