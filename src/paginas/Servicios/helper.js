import { gql, useQuery } from '@apollo/client';
import * as yup from 'yup';

export const dataCache = 'getAllHerramientas';
export const validacion = yup.object({
	clasificacionID: yup.string().required('La clasificación es requerida'),
	nombre: yup.string().required('El nombre es requerido'),
	marca: yup.string().required('La marca es requerida'),
	estado: yup.string().required('El estado es requerido'),
	precio: yup.string().required('El precio es requerido'),
	estatus: yup.string().required('El estatus es requerido'),
	descripcion: yup.string().required('La descripcion es requerida'),
});

export const estatus = [
	{ id: true, nombre: 'Activo' },
	{ id: false, nombre: 'Inactivo' },
];

export const estadoHerramienta = [
	{ id: 1, nombre: 'Realizado', color: 'success' },
	{ id: 2, nombre: 'En proceso', color: 'warning' },
	{ id: 3, nombre: 'Pendiente', color: 'error' },
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

const UPDATE = gql`
	mutation UpdateHerramienta(
		$updateHerramientaId: ID!
		$input: herramientaDatos!
	) {
		updateHerramienta(id: $updateHerramientaId, input: $input) {
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

const DELETE = gql`
	mutation Mutation($deleteHerramientaId: ID) {
		deleteHerramienta(id: $deleteHerramientaId) {
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
	query GetAllHerramientas($offset: Int, $limit: Int, $txtBusqueda: String) {
		getAllHerramientas(
			offset: $offset
			limit: $limit
			txtBusqueda: $txtBusqueda
		) {
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

const GET_CLIENTES = gql`
	query GetAllCliente($offset: Int, $limit: Int, $txtBusqueda: String) {
		getAllCliente(offset: $offset, limit: $limit, txtBusqueda: $txtBusqueda) {
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

const GET_TIPO_SERVICIO = gql`
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

const GET_BYID = gql`
	query GetHerramienta($getHerramientaId: ID!) {
		getHerramienta(id: $getHerramientaId) {
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
`;

const exportedObject = {
	GET_TIPO_SERVICIO,
	GET_CLIENTES,
	GET_BYID,
	CREATE,
	UPDATE,
	DELETE,
	GET,
};

export default exportedObject;
