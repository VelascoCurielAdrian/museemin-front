import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useReactiveVar } from '@apollo/client';
import { searchField } from '../../configuracion/apollo/cache';
import { Component, SearchIcon, SearchInput } from './styles';

export const SearchField = () => {
	const textSearch = useReactiveVar(searchField);
	const [txtBusqueda, setTxtBusqueda] = useState(textSearch);

	const manejadorKeyDown = (e) => {
		if (e.key === 'Enter') searchField(txtBusqueda);
	};

	return (
		<Component>
			<SearchIcon>
				<FaSearch />
			</SearchIcon>
			<SearchInput
				size="large"
				fullWidth
				placeholder="Buscar"
				value={txtBusqueda}
				onChange={({ target: { value } }) => setTxtBusqueda(value)}
				inputProps={{ 'aria-label': 'search' }}
				onKeyDown={manejadorKeyDown}
			/>
		</Component>
	);
};
