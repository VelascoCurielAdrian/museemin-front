import { Navigate, Route, Routes } from 'react-router-dom';
import { DashBoard } from '../componentes/DashBoard';
import { Clasificacion, Cliente, Herramientas, Trabajadores } from '../paginas';

export const DaashBoardRoutes = () => {
	return (
		<>
			<DashBoard>
				<div className='container'>
					<Routes>
						<Route path='clientes' element={<Cliente />} />
						<Route path='trabajadores' element={<Trabajadores />} />
						<Route path='herramientas' element={<Herramientas />} />
						<Route path='clasificaciones' element={<Clasificacion />} />
						<Route path='/' element={<Navigate to='/home' />} />
					</Routes>
				</div>
			</DashBoard>
		</>
	);
};
