import { gql } from '@apollo/client';

const FRAGMENTS = {
	paqueteHerramienta: gql`
		fragment data on Paqueteherramienta {
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
	mutation CreatePaqueteHerramienta($input: datosPaqueteHerramienta!) {
		createPaqueteHerramienta(input: $input) {
			mensaje
			respuesta {
				id
				descripcion
				usuarioRegistroID
				CapturaPaqueteHerramientas {
					descripcion
					herramientaID
					herramienta {
						nombre
						descripcion
						precio
						marca
						estado
						id
						usuarioRegistroID
						clasificacionID
						activo
						estatus
					}
					usuarioRegistroID
					activo
					estatus
					id
				}
				activo
				estatus
			}
		}
	}
`;

const UPDATE = gql`
	mutation UpdatePaqueteHerramienta(
		$updatePaqueteHerramientaId: ID!
		$input: datosPaqueteHerramienta!
	) {
		updatePaqueteHerramienta(id: $updatePaqueteHerramientaId, input: $input) {
			mensaje
			respuesta {
				id
				descripcion
				usuarioRegistroID
				CapturaPaqueteHerramientas {
					id
					descripcion
					herramientaID
					herramienta {
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
						}
						activo
						estatus
					}
					usuarioRegistroID
					activo
					estatus
				}
				activo
				estatus
			}
		}
	}
	${FRAGMENTS.paqueteHerramienta}
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
	${FRAGMENTS.paqueteHerramienta}
`;

const GET = gql`
	query GetAllPaqueteHerramientas(
		$offset: Int
		$limit: Int
		$txtBusqueda: String
	) {
		getAllPaqueteHerramientas(
			offset: $offset
			limit: $limit
			txtBusqueda: $txtBusqueda
		) {
			count
			rows {
				id
				descripcion
				usuarioRegistroID
				CapturaPaqueteHerramientas {
					descripcion
					herramientaID
					herramienta {
						nombre
						descripcion
						precio
						marca
						estado
						id
						usuarioRegistroID
						clasificacionID
						activo
						estatus
					}
					usuarioRegistroID
					activo
					estatus
					id
				}
				activo
				estatus
			}
		}
	}
`;

const GET_BYID = gql`
	query GetHerramienta($getHerramientaId: ID!) {
		getHerramienta(id: $getHerramientaId) {
			...data
		}
	}
	${FRAGMENTS.paqueteHerramienta}
`;

export const PaqueteHerramientasActions = {
	GET_BYID,
	CREATE,
	DELETE,
	UPDATE,
	GET,
};
