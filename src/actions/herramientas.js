import { gql } from '@apollo/client';

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
	mutation CreateHerramienta($input: herramientaDatos!) {
		createHerramienta(input: $input) {
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
		$updateHerramientaId: ID!
		$input: herramientaDatos!
	) {
		updateHerramienta(id: $updateHerramientaId, input: $input) {
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
	query GetHerramienta($getHerramientaId: ID!) {
		getHerramienta(id: $getHerramientaId) {
			...data
		}
	}
	${FRAGMENTS.Herramienta}
`;

export const HerramientasActions = {
	GET_BYID,
	CREATE,
	DELETE,
	UPDATE,
	GET,
};
