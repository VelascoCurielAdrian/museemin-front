import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { useQuery } from '@apollo/client';

export const ListCheckBox = ({ gql, operation, valueProp, icon, getValue }) => {
	const [checked, setChecked] = useState([1]);
	const { data, loading, error } = useQuery(gql, {
		variables: {
			offset: null,
			limit: null,
			txtBusqueda: '',
		},
	});

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

	if (loading) return <h1>....cargando</h1>;
	if (error) return <h1>....error</h1>;

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
			{data[operation]?.rows.map((value, index) => {
				const labelId = `checkbox-list-secondary-label-${value.id}`;
				const key = `checkbox-list-secondary-label-${value.id} + ${index}`;
				return (
					<ListItem
						key={key}
						disablePadding
						secondaryAction={
							<Checkbox
								edge="end"
								onChange={handleToggle(value.id)}
								checked={checked.indexOf(value.id) !== -1}
								inputProps={{ 'aria-labelledby': labelId }}
							/>
						}
					>	
						<ListItemButton>
							<ListItemAvatar>
								<Avatar className='bg-slate-400'>{icon}</Avatar>
							</ListItemAvatar>
							<ListItemText id={labelId} primary={value[valueProp] || getValue(value)}/>
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};
