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
	const loadingImage = useDebounce(loading, 1000);

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
						<>
							{loadingImage ? (
								Array(8)
									.fill(1)
									.map((card, index) => (
										<div className="group relative" key={index}>
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
									))
							) : (
								<h1>h</h1>
							)}
						</>
					</div>
				</div>
			</div>
		</>
	);
};
