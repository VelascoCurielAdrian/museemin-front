import { useState } from 'react';
import propTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { useReactiveVar } from '@apollo/client';
import { searchField } from '../../configuracion/apollo/cache';
import { Component, SearchIcon, SearchInput } from './styles';

export const SearchField = ({ fullWidth }) => {
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
				fullWidth={fullWidth}
				placeholder="Buscar"
				value={txtBusqueda}
				onChange={({ target: { value } }) => setTxtBusqueda(value)}
				inputProps={{ 'aria-label': 'search' }}
				onKeyDown={manejadorKeyDown}
			/>
		</Component>
	);
};

SearchField.propTypes = {
	fullWidth: propTypes.bool,
};

SearchField.defaultProps = {
	fullWidth: true,
};
