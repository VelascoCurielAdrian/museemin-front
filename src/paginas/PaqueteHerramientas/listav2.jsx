import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../componentes/Header/component';
import { useQuery, useReactiveVar } from '@apollo/client';
import { PaqueteHerramientasActions } from '../../actions/paqueteHerramientas';
import { CgDetailsMore } from 'react-icons/cg';
import { IconButton, Skeleton, Avatar } from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import { searchField } from '../../configuracion/apollo/cache';

const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
		return () => clearTimeout(timer);
	}, [value, delay]);

	return debouncedValue;
};

export const PaqueteHerramientas = () => {
	const navigate = useNavigate();
	const txtBusqueda = useReactiveVar(searchField);
	const { data, loading } = useQuery(PaqueteHerramientasActions.GET, {
		variables: {
			offset: null,
			limit: null,
			txtBusqueda: '',
		},
	});
	const loadingImage = useDebounce(loading, 1500);

	const handleNew = () => {
		navigate('/paqueteHerramientas/formulario');
	};
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
						{(loadingImage
							? Array.from(
									new Array(data?.getAllPaqueteHerramientas?.rows.length),
							  )
							: data?.getAllPaqueteHerramientas?.rows
						).map((item, index) => (
							<div key={`Herramientas-${index}`}>
								{item ? (
									<div className="group relative">
										<h2 className="text-xl m-2 font-bold tracking-tight text-gray-600">
											{item.descripcion}
										</h2>
										<div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
											<img
												src={item.imagen}
												alt={`${item.imagen} - ${item.id}`}
												className="h-full w-full object-cover object-center lg:h-full lg:w-full"
											/>
										</div>
										<div className="mt-2 flex justify-between">
											<IconButton
												sx={{ display: 'flex', flexDirection: 'column' }}
											>
												<CgDetailsMore size={20} />
												<p className="text-xs text-gray-500">Detalles</p>
											</IconButton>
											<IconButton
												sx={{ display: 'flex', flexDirection: 'column' }}
											>
												<MdEdit size={20} />
												<p className="text-xs text-gray-500">Editar</p>
											</IconButton>
											<IconButton
												sx={{ display: 'flex', flexDirection: 'column' }}
											>
												<MdDelete size={20} />
												<p className="text-xs text-gray-500">Eliminar</p>
											</IconButton>
										</div>
									</div>
								) : (
									<div className="group relative">
										<Skeleton className="text-2xl m-2 font-bold tracking-tight text-gray-900" />
										<Skeleton
											variant="rectangular"
											className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80"
										/>
										<div className="mt-2 flex justify-between">
											<Skeleton variant="circular">
												<Avatar />
											</Skeleton>
											<Skeleton variant="circular">
												<Avatar />
											</Skeleton>
											<Skeleton variant="circular">
												<Avatar />
											</Skeleton>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
