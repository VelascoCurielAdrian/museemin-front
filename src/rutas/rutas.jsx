import { Navigate, Route, Routes } from 'react-router-dom';

const MarvelPage = () => <h1>MarvelPage</h1>;
const DcPage = () => <h1>DcPage</h1>;
const SearchPage = () => <h1>SearchPage</h1>;
const HeroPage = () => <h1>HeroPage</h1>;

export const HeroesRoutes = () => {
	return (
		<>
			<div className='container'>
				<Routes>
					<Route path='marvel' element={<MarvelPage />} />
					<Route path='dc' element={<DcPage />} />

					<Route path='search' element={<SearchPage />} />
					<Route path='hero/:id' element={<HeroPage />} />

					<Route path='/' element={<Navigate to='/marvel' />} />
				</Routes>
			</div>
		</>
	);
};
