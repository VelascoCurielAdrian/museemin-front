import { Route, Routes } from 'react-router-dom';

import { HeroesRoutes } from '../../rutas/rutas';
import { Login } from '../auth';
import { PrivateRoute } from './privateRouter';
import { PublicRoute } from './publicRoutes';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route
					path='login/*'
					element={
						<PublicRoute>
							{/* <LoginPage /> */}
							<Routes>
								<Route path='/*' element={<Login />} />
							</Routes>
						</PublicRoute>
					}
				/>

				<Route
					path='/*'
					element={
						<PrivateRoute>
							<HeroesRoutes />
						</PrivateRoute>
					}
				/>
			</Routes>
		</>
	);
};
