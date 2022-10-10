import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

import logo from '../../assets/Logo.png';
import { useEffect, useState } from 'react';

const trabajadores = [
	{
		id: 0,
		name: 'Deidre Hicks',
	},
	{
		id: 1,
		name: 'Liz Spencer',
	},
	{
		id: 2,
		name: 'Hatfield Cantu',
	},
	{
		id: 3,
		name: 'Gilmore Kaufman',
	},
	{
		id: 4,
		name: 'Cotton Espinoza',
	},
	{
		id: 5,
		name: 'Marguerite Blevins',
	},
	{
		id: 6,
		name: 'Velasquez Whitley',
	},
	{
		id: 7,
		name: 'Henderson Baxter',
	},
	{
		id: 8,
		name: 'May Payne',
	},
	{
		id: 9,
		name: 'Grimes Beasley',
	},
	{
		id: 10,
		name: 'Lowe Morgan',
	},
	{
		id: 11,
		name: 'Mccray Mccray',
	},
];
const clientes = [
	{
		id: 0,
		name: 'Servicio de refrigeración.',
	},
	{
		id: 1,
		name: 'Servicio de corte y soldadura',
	},
	{
		id: 2,
		name: 'Servicio de tabla roca',
	},
	{
		id: 3,
		name: 'Servicio de carpinteria',
	},
	{
		id: 4,
		name: 'Servicio de limpieza',
	},
	{
		id: 5,
		name: 'Servicio de jardineria',
	},
];

export const ListaTrabajdor = ({tipo}) => {
	const [checked, setChecked] = useState([1]);
	const [data, setData] = useState([]);

	useEffect(() => {
		if(tipo === 'trabajadores'){
			setData(trabajadores);
		}else {
			setData(clientes);
		}
	},[tipo]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<List
			dense
			sx={{
				width: '100%',
				bgcolor: 'background.paper',
				position: 'relative',
				overflow: 'auto',
				maxHeight: 240,
				'& ul': { padding: 0 },
			}}
		>
			{data.map((value) => {
				const labelId = `checkbox-list-secondary-label-${value.id}`;
				return (
					<ListItem
						key={value.id}
						secondaryAction={
							<Checkbox
								edge="end"
								onChange={handleToggle(value.id)}
								checked={checked.indexOf(value.id) !== -1}
								inputProps={{ 'aria-labelledby': labelId }}
							/>
						}
						disablePadding
					>
						<ListItemButton>
							<ListItemAvatar>
								<Avatar alt={`Avatar n°${value.id + 1}`} src={logo} />
							</ListItemAvatar>
							<ListItemText id={labelId} primary={value.name} />
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};
