import { gql } from '@apollo/client';
import * as yup from 'yup';
import { MESSAGE_REQUIRED } from '../helpers/constants';

const FRAGMENTS = {
	Cotizaciones: gql`
		fragment data on cotizacion {
			id
			clienteID
			descripcion
			fecha
			proceso
			subTotal
			usuarioRegistroID
			cliente {
				nombre
			}
			CotizacionDetalles {
				id
				cotizacionID
				descripcion
				unidad
				precio
				cantidad
				importe
				activo
			}
			activo
			estatus
		}
	`,
};

const CREATE = gql`
	mutation CreateCotizaciones(
		$clienteID: ID
		$descripcion: String
		$fecha: Date
		$proceso: Int
		$subTotal: Float
		$usuarioRegistroID: ID
		$CapturaCotizacionesDetalles: [datosCapturaDetalleCotizaciones]
	) {
		createCotizaciones(
			input: {
				clienteID: $clienteID
				descripcion: $descripcion
				fecha: $fecha
				proceso: $proceso
				subTotal: $subTotal
				usuarioRegistroID: $usuarioRegistroID
				CapturaCotizacionesDetalles: $CapturaCotizacionesDetalles
			}
		) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Cotizaciones}
`;

const UPDATE = gql`
	mutation UpdateCotizaciones(
    $updateID: ID
		$clienteID: ID
		$descripcion: String
		$fecha: Date
		$proceso: Int
		$subTotal: Float
		$usuarioRegistroID: ID
		$CapturaCotizacionesDetalles: [datosCapturaDetalleCotizaciones]
	) {
		updateCotizaciones(
			id: $updateID
			input: {
				clienteID: $clienteID
				descripcion: $descripcion
				fecha: $fecha
				proceso: $proceso
				subTotal: $subTotal
				usuarioRegistroID: $usuarioRegistroID
				CapturaCotizacionesDetalles: $CapturaCotizacionesDetalles
			}
		) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Cotizaciones}
`;

const DELETE = gql`
	mutation DeleteCotizaciones($deleteId: ID) {
		deleteCotizaciones(id: $deleteId) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Cotizaciones}
`;

const GET = gql`
	query GetAllCotizaciones($offset: Int, $limit: Int, $txtBusqueda: String) {
		getAllCotizaciones(
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
	${FRAGMENTS.Cotizaciones}
`;

const GET_BYID = gql`
	query GetCotizaciones($id: ID!) {
		getCotizaciones(id: $id) {
			...data
		}
	}
	${FRAGMENTS.Cotizaciones}
`;

export const ValidacionCotizacion = yup.object().shape({
	descripcion: yup.string().required(MESSAGE_REQUIRED),
	proceso: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required(MESSAGE_REQUIRED),
	clienteID: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required(MESSAGE_REQUIRED),
	subTotal: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value)),
});

export const ValidacionDetalleCotizacion = yup.object({
	descripcion: yup.string().required(MESSAGE_REQUIRED),
	unidad: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required(MESSAGE_REQUIRED),
	precio: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required(MESSAGE_REQUIRED),
	cantidad: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required(MESSAGE_REQUIRED),
});

export const CotizacionesActions = {
	GET_BYID,
	CREATE,
	DELETE,
	UPDATE,
	GET,
};
