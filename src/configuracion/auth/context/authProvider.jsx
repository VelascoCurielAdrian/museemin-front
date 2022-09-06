import { useReducer } from 'react';
import { AuthContext } from './authContext';
import { authReducer } from './authReducer';

import { types } from '../types';

const init = () => {
	const user = JSON.parse(localStorage.getItem('token'));

	return {
		logged: !!user,
		user: user,
	};
};

export const AuthProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {}, init);

	const login = (name = '') => {
		const user = { id: 'ABC', name };
		const action = { type: types.login, payload: user };

		localStorage.setItem('token', JSON.stringify(user));

		dispatch(action);
	};

	const logout = () => {
		localStorage.removeItem('token');
		const action = { type: types.logout };
		dispatch(action);
	};

	return (
		<AuthContext.Provider
			value={{
				...authState,

				// Methods
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
