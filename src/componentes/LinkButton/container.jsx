import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import MuiListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { withStyles } from '@mui/styles';
import paleta from '../../configuracion/paleta';

const ListItem = withStyles({
	root: {
		'&$selected': {
			backgroundColor: paleta.bar.primary,
			color: paleta.bar.primary,
			'& .MuiListItemIcon-root': {
				color: paleta.bar.primary,
			},
		},
		'&$selected:hover': {
			backgroundColor: 'red',
			color: paleta.bar.secondary,
			'& .MuiListItemIcon-root': {
				color: paleta.bar.primary,
			},
		},
		'&:hover': {
			backgroundColor: 'blue',
			color: 'primary',
			'& .MuiListItemIcon-root': {
				color: paleta.bar.secondary,
			},
		},
	},
	selected: {},
})(MuiListItem);

const LinkButton = (props) => {
	const location = useLocation();

	const handleClick = () => {
		props.handleClick && props.handleClick();
	};

	return (
		<ListItem
			onClick={handleClick}
			button
			component={Link}
			to={props.url}
			selected={props.url === location.pathname}
		>
			{props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
			<ListItemText primary={props.label} />
		</ListItem>
	);
};

const other = () => {};

export { LinkButton, other };
