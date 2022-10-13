import { Navigate, Route, Routes } from 'react-router-dom';
import { DashBoard } from '../componentes/DashBoard';
import { Cliente, Clientes } from '../paginas/Clientes';
import { Servicio, Servicios } from '../paginas/Servicios';
import { Trabajador, Trabajadores } from '../paginas/Trabajadores';
import { Herramienta, Herramientas } from '../paginas/Herramientas';
import { Almacen, TablaAlmacen } from '../paginas/Almacen';
import {
	PaqueteHerramientas,
	PaqueteHerramienta,
} from '../paginas/PaqueteHerramientas';

export const DaashBoardRoutes = () => {
	return (
		<DashBoard>
			<div className="container">
				<Routes>
					<Route path="clientes" element={<Clientes />} />
					<Route path="cliente/formulario" element={<Cliente />} />
					<Route path="cliente/formulario/:id" element={<Cliente />} />

					<Route path="trabajadores" element={<Trabajadores />} />
					<Route path="trabajador/formulario" element={<Trabajador />} />
					<Route path="trabajador/formulario/:id" element={<Trabajador />} />

					<Route path="herramientas" element={<Herramientas />} />
					<Route path="herramienta/formulario" element={<Herramienta />} />
					<Route path="herramienta/formulario/:id" element={<Herramienta />} />

					<Route path="servicios" element={<Servicios />} />
					<Route path="servicio/formulario" element={<Servicio />} />
					<Route path="servicio/formulario/:id" element={<Servicio />} />

					<Route path="almacen" element={<Almacen />} />

					<Route path="paqueteHerramientas" element={<PaqueteHerramientas />} />
					<Route
						path="paqueteHerramientas/formulario"
						element={<PaqueteHerramienta />}
					/>
					<Route
						path="paqueteHerramientas/formulario/:id"
						element={<PaqueteHerramienta />}
					/>
					<Route path="/" element={<Navigate to="/home" />} />
				</Routes>
			</div>
		</DashBoard>
	);
};
