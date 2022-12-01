import { Navigate, Route, Routes } from 'react-router-dom';
import { DashBoard } from '../componentes/DashBoard';
import { Cliente, Clientes } from '../paginas/Clientes';
import { Trabajador, Trabajadores } from '../paginas/Trabajadores';
import { Herramienta, Herramientas } from '../paginas/Herramientas';
import {
	PaqueteHerramientas,
	PaqueteHerramienta,
} from '../paginas/PaqueteHerramientas';
import { Gastos, Gasto } from '../paginas/Gastos';
import { Cotizaciones, Cotizacion } from '../paginas/Cotizacion';

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

					<Route path="paqueteHerramientas" element={<PaqueteHerramientas />} />
					<Route
						path="paqueteHerramientas/formulario"
						element={<PaqueteHerramienta />}
					/>
					<Route
						path="paqueteHerramientas/formulario/:id"
						element={<PaqueteHerramienta />}
					/>
					<Route path="cotizaciones" element={<Cotizaciones />} />
					<Route path="cotizacion/formulario" element={<Cotizacion />} />
					<Route path="cotizacion/formulario/:id" element={<Cotizacion />} />

					<Route path="gastos" element={<Gastos />} />
					<Route path="gastos/formulario" element={<Gasto />} />
					<Route path="gastos/formulario/:id" element={<Gasto />} />
					<Route path="/" element={<Navigate to="/home" />} />
				</Routes>
			</div>
		</DashBoard>
	);
};
