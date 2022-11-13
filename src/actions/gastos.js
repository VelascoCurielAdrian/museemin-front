import { gql } from '@apollo/client';
import * as yup from 'yup';
import { MESSAGE_REQUIRED } from '../helpers/constants';

const FRAGMENTS = {
	Gastos: gql`
		fragment data on gastos {
			id
			trabajadorID
			clienteID
			descripcion
			compania
			fecha
			metodoPago
			tipoGasto
			importe
			diferencia
			subTotal
			total
			usuarioRegistroID
			trabajador {
				id
				nombres
				primerApellido
				segundoApellido
			}
			cliente {
				id
				nombre
				primerTelefono
			}
			DetalleGastos {
				id
				gastoID
				descripcion
				unidad
				precio
				cantidad
				precioParcial
				activo
			}
			activo
			estatus
		}
	`,
};

const CREATE = gql`
	mutation CreateGasto(
		$trabajadorID: ID
		$clienteID: ID
		$descripcion: String
		$compania: String
		$fecha: Date
		$metodoPago: Int
		$tipoGasto: Int
		$importe: Float
		$diferencia: Float
		$subTotal: Float
		$total: Float
		$usuarioRegistroID: ID
		$CapturaDetalleGastos: [datosCapturaDetalleGastos]
	) {
		createGastos(
			input: {
				trabajadorID: $trabajadorID
				clienteID: $clienteID
				descripcion: $descripcion
				compania: $compania
				fecha: $fecha
				metodoPago: $metodoPago
				tipoGasto: $tipoGasto
				importe: $importe
				diferencia: $diferencia
				subTotal: $subTotal
				total: $total
				usuarioRegistroID: $usuarioRegistroID
				CapturaDetalleGastos: $CapturaDetalleGastos
			}
		) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Gastos}
`;

const UPDATE = gql`
	mutation UpdateGastos(
		$updateID: ID
		$trabajadorID: ID
		$clienteID: ID
		$descripcion: String
		$compania: String
		$fecha: Date
		$metodoPago: Int
		$tipoGasto: Int
		$importe: Float
		$diferencia: Float
		$subTotal: Float
		$total: Float
		$usuarioRegistroID: ID
		$CapturaDetalleGastos: [datosCapturaDetalleGastos]
	) {
		updateGastos(
			id: $updateID
			input: {
				trabajadorID: $trabajadorID
				clienteID: $clienteID
				descripcion: $descripcion
				compania: $compania
				fecha: $fecha
				metodoPago: $metodoPago
				tipoGasto: $tipoGasto
				importe: $importe
				diferencia: $diferencia
				subTotal: $subTotal
				total: $total
				usuarioRegistroID: $usuarioRegistroID
				CapturaDetalleGastos: $CapturaDetalleGastos
			}
		) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Gastos}
`;

const DELETE = gql`
	mutation DeleteGastos($deleteId: ID) {
		deleteGastos(id: $deleteId) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Gastos}
`;

const GET = gql`
	query GetAllGastos($offset: Int, $limit: Int, $txtBusqueda: String) {
		getAllGastos(offset: $offset, limit: $limit, txtBusqueda: $txtBusqueda) {
			count
			rows {
				...data
			}
		}
	}
	${FRAGMENTS.Gastos}
`;

const GET_BYID = gql`
	query GetGastos($id: ID!) {
		getGastos(id: $id) {
			...data
		}
	}
	${FRAGMENTS.Gastos}
`;

export const ValidacionGasto = yup.object().shape({
	compania: yup.string().required(MESSAGE_REQUIRED),
	trabajadorID: yup.string().required(MESSAGE_REQUIRED),
	metodoPago: yup.string().required(MESSAGE_REQUIRED),
	clienteID: yup.string().required(MESSAGE_REQUIRED),
	importe: yup.string().required(MESSAGE_REQUIRED),
	diferencia: yup.string().required(MESSAGE_REQUIRED),
	descripcion: yup.string().required(MESSAGE_REQUIRED),
	articulos: yup.array().of(
		yup.object().shape({
			descripcion: yup.string(),
			unidad: yup.string(),
			precio: yup.string(),
			cantidad: yup.string(),
		}),
	),
});

export const GastosActions = {
	GET_BYID,
	CREATE,
	DELETE,
	UPDATE,
	GET,
};
