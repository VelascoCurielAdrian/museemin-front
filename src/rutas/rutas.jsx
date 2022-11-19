import { Navigate, Route, Routes } from 'react-router-dom';
import { DashBoard } from '../componentes/DashBoard';
import { Cliente, Clientes } from '../paginas/Clientes';
import { Trabajador, Trabajadores } from '../paginas/Trabajadores';
import { Herramienta, Herramientas } from '../paginas/Herramientas';
import { Gastos, Gasto } from '../paginas/Gastos';
import { Cotizacion, Cotizaciones } from '../paginas/Cotizacion';

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

					{/* <Route path="servicios" element={<Servicios />} />
					<Route path="servicio/formulario" element={<Servicio />} />
					<Route path="servicio/formulario/:id" element={<Servicio />} /> */}

					{/* <Route path="almacen" element={<Almacen />} /> */}
					<Route path="gastos" element={<Gastos />} />
					<Route path="gastos/formulario" element={<Gasto />} />
					<Route path="gastos/formulario/:id" element={<Gasto />} />

					{/* <Route path="cotizaciones" element={<Cotizaciones />} />
					<Route path="cotizacion/formulario" element={<Cotizacion />} />
					<Route path="cotizacion/formulario/:id" element={<Cotizacion />} /> */}

					<Route path="/" element={<Navigate to="/home" />} />
				</Routes>
			</div>
		</DashBoard>
	);
};
