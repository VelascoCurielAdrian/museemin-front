export const IS_REQUERED = 'Numero invalido';
export const NUMBER_INVALID = 'Numero invalido';
export const MESSAGE_REQUIRED = 'Este campo es requerido';
export const ZIP_CODE = 'Codigo postal invalido';
export const TELEPHONE_VALIDATE =
	'El télefono debe tener como minimo 10 dígitos';
export const TELEPHONE_INVALID = 'Numero télefono invalido';
export const EMAIL_INVALID = 'Correo electronico invalido';
export const NUMBER_ADDRESSLINE_MIN = 'debe tener como minimo 4 caracteres';
export const NUMBER_ADDRESSLINE_MAX = 'debe tener como maximo 4 caracteres';

export const estatus = [
	{ id: true, nombre: 'Habilitado' },
	{ id: false, nombre: 'Inhabilitado' },
];

export const Generos = [
	{ id: 'M', nombre: 'Masculino' },
	{ id: 'F', nombre: 'Femenino' },
];

export const estadoHerramienta = [
	{ id: 1, nombre: 'Nuevo' },
	{ id: 2, nombre: 'Usado' },
	{ id: 3, nombre: 'Dañado' },
];

export const tiposMetodoPago = [
	{ id: 1, nombre: 'Efectivo' },
	{ id: 2, nombre: 'Tarjeta de credito' },
	{ id: 3, nombre: 'Tarjeta de debito' },
	{ id: 4, nombre: 'Transferencia electronica' },
	{ id: 5, nombre: 'Vales de despensa' },
	{ id: 6, nombre: 'Intermediario de pago' },
];

export const filters = {
	offset: null,
	limit: null,
	txtBusqueda: '',
};

export const unidades = [
	{ id: 1, nombre: 'Kilogramo' },
	{ id: 2, nombre: 'Metro' },
	{ id: 3, nombre: 'Pieza' },
	{ id: 4, nombre: 'Litro' },
];
