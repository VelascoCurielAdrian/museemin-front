import { Navigate, Route, Routes } from "react-router-dom";
import { DashBoard } from "../componentes/DashBoard";
import { Cliente, Clientes } from "../paginas/Clientes";
import { Trabajador, Trabajadores } from "../paginas/Trabajadores";
import { Herramienta, Herramientas } from "../paginas/Herramientas";
import { PaqueteHerramienta, PaqueteHerramientas } from "../paginas/PaqueteHerramientas";

export const DaashBoardRoutes = () => {
	return (
		<DashBoard>
			<div className='container'>
				<Routes>
					<Route path='clientes' element={<Clientes />} />
					<Route path='cliente/formulario' element={<Cliente />} />
					<Route path='cliente/formulario/:id' element={<Cliente />} />

					<Route path='trabajadores' element={<Trabajadores />} />
					<Route path='trabajador/formulario' element={<Trabajador />} />
					<Route path='trabajador/formulario/:id' element={<Trabajador />} />

					<Route path='herramientas' element={<Herramientas />} />
					<Route path='herramienta/formulario' element={<Herramienta />} />
					<Route path='herramienta/formulario/:id' element={<Herramienta />} />

					<Route path='paqueteHerramientas' element={<PaqueteHerramientas />} />
					<Route path='paqueteHerramienta/formulario' element={<PaqueteHerramienta />} />
					<Route path='paqueteHerramienta/formulario/:id' element={<PaqueteHerramienta />} />
					<Route path='/' element={<Navigate to='/home' />} />
				</Routes>
			</div>
		</DashBoard>
	);
};
