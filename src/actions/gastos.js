import { gql } from '@apollo/client';
import * as yup from 'yup';
import { MESSAGE_REQUIRED } from '../helpers/constants';

const FRAGMENTS = {
	Gasto: gql`
		fragment data on gastos {
			id
			trabajadorID
			clienteID
			descripcion
			compania
			fecha
			metodoPago
			importe
			diferencia
			subtotal
			total
			usuarioRegistroID
			trabajador {
				id
				nombres
				primerApellido
				segundoApellido
				sexo
				telefono
				correo
				colonia
				calles
				referencia
				numeroExterior
				usuarioRegistroID
				activo
				estatus
			}
			cliente {
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
			DetalleGastos {
				id
				gastoID
				descripcion
				precio
				cantidad
			}
			activo
			estatus
		}
	`,
};

const CREATE = gql`
	mutation CreateGasto($input: datosGastos!) {
		createGastos(input: $input) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Gasto}
`;

const UPDATE = gql`
	mutation CreateGasto($input: datosGastos!) {
		createGastos(input: $input) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Gasto}
`;

const DELETE = gql`
	mutation DeleteGastos($deleteGastosId: ID) {
		deleteGastos(id: $deleteGastosId) {
			mensaje
			respuesta {
				...data
			}
		}
	}
	${FRAGMENTS.Gasto}
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
	${FRAGMENTS.Gasto}
`;

const GET_BYID = gql`
	query GetGastos($id: ID!) {
		getGastos(id: $id) {
			...data
		}
	}
	${FRAGMENTS.Gasto}
`;

export const Validate = yup.object({
	trabajadorID: yup.string().required(MESSAGE_REQUIRED),
	clienteID: yup.string().required(MESSAGE_REQUIRED),
	compania: yup.string().required(MESSAGE_REQUIRED),
	metodoPago: yup.string().required(MESSAGE_REQUIRED),
	importe: yup.string().required(MESSAGE_REQUIRED),
	diferencia: yup.string().required(MESSAGE_REQUIRED),
});

export const GastosActions = {
	GET_BYID,
	CREATE,
	DELETE,
	UPDATE,
	GET,
};
