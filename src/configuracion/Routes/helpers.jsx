import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const token = localStorage.getItem('token');

const Authenticated = ({ component: C, ...rest }) =>
	token ? (
		<Route {...rest} render={(props) => <C {...props} />} />
	) : (
		<Navigate to='/login' />
	);

const Unauthenticated = ({ component: C, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (!token ? <C {...props} /> : <Navigate to='/' />)}
	/>
);

export { Authenticated, Unauthenticated };
