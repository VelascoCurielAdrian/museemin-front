import { Navigate, Route, Routes } from "react-router-dom";
import { DashBoard } from "../componentes/DashBoard";
import { Herramienta, Herramientas } from "../paginas/Herramientas";
import { Trabajador, Trabajadores } from "../paginas/Trabajadores";

export const DaashBoardRoutes = () => {
	return (
		<DashBoard>
			<div className='container'>
				<Routes>
					<Route path='trabajadores' element={<Trabajadores />} />
					<Route path='trabajador/formulario' element={<Trabajador />} />
					<Route path='trabajador/formulario/:id' element={<Trabajador />} />

					<Route path='herramientas' element={<Herramientas />} />
					<Route path='herramienta/formulario' element={<Herramienta />} />
					<Route path='herramienta/formulario/:id' element={<Herramienta />} />
					<Route path='/' element={<Navigate to='/home' />} />
				</Routes>
			</div>
		</DashBoard>
	);
};
