import { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { DetalleCotizacion } from './detalleCotizacion';
import { snackbar } from '../../configuracion/apollo/cache';
import { Header } from '../../componentes/Header/component';
import { filters, procesoCotizacion } from '../../helpers/constants';
import { ClientesActions } from '../../actions/clientes';
import useFormActions from '../../hooks/useForm';
import {
	DatePickerController,
	SelectFieldController,
	TextFieldController,
} from '../../componentes/Formulario';
import {
	CotizacionesActions,
	ValidacionCotizacion,
} from '../../actions/cotizaciones';

const dataInicial = {
	fecha: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
	clienteID: '',
	proceso: '',
	subTotal: '',
	descripcion: '',
};
const defaultSnackbar = { isOpen: true, time: 3000 };
export const Cotizacion = () => {
	const { id } = useParams();
	const [clientes, setClientes] = useState([]);
	const [detalleCotizacion, setDetalleCotizacion] = useState([]);

	const {
		reset,
		control,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(ValidacionCotizacion),
		defaultValues: dataInicial,
	});
	const subTotal = useWatch({ control, name: 'subTotal' });

	const { isLoading, actionForm } = useFormActions({
		method: id ? 'update' : 'create',
		operation: 'getAllCotizaciones',
		actions: CotizacionesActions,
		formData: dataInicial,
		setValues: false,
		redirect: true,
		name: 'cotizaciones',
		reset,
		id,
	});

	const [getById, { loading }] = useLazyQuery(CotizacionesActions.GET_BYID, {
		fetchPolicy: 'no-cache',
		onCompleted: (response) => {
			const values = Object.values(response)[0];
			const { CotizacionDetalles } = values;
			reset(values);
			setDetalleCotizacion(CotizacionDetalles);
		},
	});

	useEffect(() => {
		id && getById({ variables: { id } });
	}, [id]);

	useQuery(ClientesActions.GET, {
		variables: { ...filters },
		onCompleted: (data) => {
			setClientes(data.getAllCliente?.rows);
		},
	});

	const handleDetalleCotizacion = (cotizaciones) => {
		setDetalleCotizacion(cotizaciones);
	};

	useEffect(() => {
		let subTotal = 0;
		if (detalleCotizacion?.length > 0) {
			subTotal = detalleCotizacion
				.map(({ importe }) => importe)
				.reduce((sum, i) => sum + i, 0);
		}
		setValue('subTotal', subTotal);
	}, [detalleCotizacion]);

	const addCotizacion = (values) => {
		values.id = detalleCotizacion.filter(({ activo }) => activo).length + 1;
		setDetalleCotizacion((prev) => [values, ...prev]);
	};

	const onSubmit = (data) => {
		if (
			detalleCotizacion.length === 0 ||
			detalleCotizacion.filter(({ activo }) => activo).length === 0
		) {
			snackbar({
				...defaultSnackbar,
				label: 'Es necesario agregar los trabajos a realizar!',
				severity: 'warning',
			});
			return;
		}

		const DetalleCotizacion = detalleCotizacion?.map((cotizacion) => {
			delete cotizacion.__typename;
			return {
				...cotizacion,
			};
		});

		actionForm({
			variables: {
				...data,
				updateID: id,
				CapturaCotizacionesDetalles: DetalleCotizacion,
			},
		});
	};

	if (loading) return <h1>...Cargando</h1>;

	return (
		<>
			<Header
				title="Cotizaciones"
				name="cotizaciones"
				subtitle="Moduló de cotizaciones"
				handleCreate={handleSubmit(onSubmit)}
				isLoading={isLoading}
				agregar
			/>
			<div className="hidden sm:block" aria-hidden="true">
				<div className="py-1">
					<div className="border-t border-gray-200" />
				</div>
			</div>
			<div className="mt-1 md:col-span-2 md:mt-0">
				<form id="formGasto">
					<div className="overflow-hidden shadow sm:rounded-md">
						<div className="bg-white px-4 py-5 sm:p-6">
							<div className="grid grid-cols-6 gap-2">
								<div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-3">
									<TextFieldController
										control={control}
										type="multiline"
										name="descripcion"
										rows={4}
										error={errors.descripcion}
										label="Descripción"
									/>
								</div>
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-3">
									<SelectFieldController
										control={control}
										label="Cliente dirigido"
										name="clienteID"
										labelProp="nombre"
										options={clientes}
										error={errors.clienteID}
									/>
								</div>
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
									<DatePickerController
										name="fecha"
										control={control}
										label="Fecha de cotización"
									/>
								</div>
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12 space-y-2">
									<SelectFieldController
										control={control}
										label="Proceso de cotización"
										name="proceso"
										labelProp="nombre"
										options={procesoCotizacion}
										error={errors.proceso}
									/>
								</div>
								<div className="col-span-12 lg:col-span-2 md:col-span-12 sm:col-span-12">
									<dl>
										<div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-20">
											<dt className="text-sm font-bold text-gray-500">
												Precio estimado:
											</dt>
											<dd className="mt-1 text-sm font-bold text-green-700 sm:col-span-2 sm:ml-20">
												${subTotal || '0.00'}
											</dd>
										</div>
										<div className="border-t border-gray-300" />
									</dl>
								</div>
								<div className="col-span-12 lg:col-span-6 md:col-span-12 sm:col-span-12 space-y-2">
									<label
										htmlFor="detalleGastos"
										className="block text-sm mb-1 font-bold text-primary"
									>
										Detalle de la cotización
									</label>
									<DetalleCotizacion
										addCotizacion={addCotizacion}
										data={detalleCotizacion}
										onChange={handleDetalleCotizacion}
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
