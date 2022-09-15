import React from 'react';

import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const LinkButton = (props) => {
	const handleClick = () => {
		props.handleClick && props.handleClick();
	};

	return (
		<ListItem onClick={handleClick} button component={Link} to={props.url}>
			{props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
			<ListItemText primary={props.label} />
		</ListItem>
	);
};

const other = () => {};

export { LinkButton, other };
