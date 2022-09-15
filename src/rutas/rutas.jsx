import { Navigate, Route, Routes } from 'react-router-dom';
import { DashBoard } from '../componentes/DashBoard';
import { Cliente, Trabajadores } from '../paginas';

import { Clasificacion, Clasificaciones } from '../paginas/Clasificacion';
import { Herramienta, Herramientas } from '../paginas/Herramientas';

export const DaashBoardRoutes = () => {
	return (
		<DashBoard>
			<div className='container'>
				<Routes>
					<Route path='clientes' element={<Cliente />} />
					<Route path='trabajadores' element={<Trabajadores />} />

					<Route path='herramientas' element={<Herramientas />} />
					<Route path='herramienta/formulario' element={<Herramienta />} />

					<Route path='clasificaciones/' element={<Clasificaciones />} />
					<Route path='clasificacion/formulario' element={<Clasificacion />} />

					<Route path='/' element={<Navigate to='/home' />} />
				</Routes>
			</div>
		</DashBoard>
	);
};
