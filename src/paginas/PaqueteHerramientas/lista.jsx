import { useNavigate } from 'react-router-dom';
import { Header } from '../../componentes/Header/component';
import { useQuery } from '@apollo/client';
import { PaqueteHerramientasActions } from '../../actions/paqueteHerramientas';
import img1 from './../../assets/fondo.png';

export const PaqueteHerramientas = () => {
	const navigate = useNavigate();

	const { data, loading, error } = useQuery(PaqueteHerramientasActions.GET, {
		variables: {
			offset: null,
			limit: null,
			txtBusqueda: null,
		},
	});

	const handleNew = () => {
		navigate('/paqueteHerramientas/formulario');
	};

	if (loading) return <h1>Cargando...</h1>;
	if (error) return <h1>Cargando...</h1>;
	return (
		<>
			<Header
				handleNew={handleNew}
				name="paqueteHerramientas"
				title="Paquete de herramientas"
				subtitle="Moduló de paquetes Herramientas"
				listado
			/>
			<div className="bg-white">
				<div className="mx-auto max-w-2xl py-10 px-4 sm:py-2 sm:px-2 lg:max-w-7xl lg:px-8">
					<div className="mt-1 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{data?.getAllPaqueteHerramientas?.rows.map((paquete) => (
							<div key={paquete.id} className="group relative">
								<h2 className="text-1xl m-2 font-bold tracking-tight text-gray-900">
									{paquete.descripcion}
								</h2>
								<div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
									<img
										src={img1}
										alt={paquete.imageAlt}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<a href={paquete.href}>
												<span aria-hidden="true" className="absolute inset-0" />
												{paquete.name}
											</a>
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											{paquete.color}
										</p>
									</div>
									<p className="text-sm font-medium text-gray-900">
										{paquete.price}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
