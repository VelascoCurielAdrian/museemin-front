import { useState } from 'react';
import propTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import List from '@mui/material/List';
import { styled, alpha } from '@mui/material/styles';
import { FaSearch } from 'react-icons/fa';
import InputBase from '@mui/material/InputBase';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Divider, IconButton, Tooltip } from '@mui/material';
import { CgAdd } from 'react-icons/cg';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	margin: 2,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	borderWidth: 1,
	borderRadius: 10,
	'& .MuiInputBase-input': {
		padding: theme.spacing(1.5, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

export const ListCheckBox = ({ uri, buscar }) => {
	const [txtBusqueda, setTxtBusqueda] = useState('');
	const [txtBusquedaAnterior, setTxtBusquedaAnterior] = useState('');
	const { data, loading, error } = useQuery(uri, {
		variables: {
			offset: null,
			limit: null,
			txtBusqueda: '',
		},
	});

	const manejadorKeyDown = (e) => {
		if (e.key === 'Enter' && buscar)
			if (txtBusquedaAnterior !== txtBusqueda) {
				buscar(txtBusqueda);
				setTxtBusquedaAnterior(txtBusqueda);
			}
	};

	if (loading) return <h1>Cargando...</h1>;
	if (error) return <h1>Cargando...</h1>;

	const handleAdd = (value, index) => {
		console.log(value);
		console.log(index);
	};
	return (
		<>
			<label
				htmlFor="label-form"
				className="block mb-2 text-sm font-medium text-gray-700"
			>
				Selccione las herramientas
			</label>
			<Search>
				<SearchIconWrapper>
					<FaSearch />
				</SearchIconWrapper>
				<StyledInputBase
					size="large"
					fullWidth
					placeholder="Buscar"
					value={txtBusqueda}
					onChange={({ target: { value } }) => setTxtBusqueda(value)}
					inputProps={{ 'aria-label': 'search' }}
					onKeyDown={manejadorKeyDown}
				/>
			</Search>
			<List
				dense
				sx={{
					width: '100%',
					position: 'relative',
					overflow: 'auto',
					backgroundColor: '#f5f5f5',
					height: '100%',
					color: '#4B5D6E',
					maxHeight: 300,
					borderRadius: 1,
					'& ul': { padding: 0 },
				}}
			>
				{Object.values(data || [])[0]?.rows.map((value, index) => {
					const labelId = `checkbox-list-secondary-label-${value.id}`;
					return (
						<>
							<ListItem
								key={labelId}
								secondaryAction={
									<Tooltip
										title="Agregar"
										placement="left"
										arrow
										onClick={() => {
											handleAdd(value, index);
										}}
									>
										<IconButton>
											<CgAdd size={18} className="text-green-700" />
										</IconButton>
									</Tooltip>
								}
								disablePadding
							>
								<ListItemButton>
									<ListItemText primary={value.nombre} />
								</ListItemButton>
							</ListItem>
							<Divider className="bg-slate-100" />
						</>
					);
				})}
			</List>
		</>
	);
};

ListCheckBox.propTypes = {
	title: propTypes.string,
	subtitle: propTypes.string,
	uri: propTypes.object,
	showHeader: propTypes.bool,
	handleNew: propTypes.func,
	columns: propTypes.array,
	rowsData: propTypes.array,
	height: propTypes.oneOfType([propTypes.string, propTypes.number]),
	showActions: propTypes.bool,
	dataFixed: propTypes.bool,
	urlDelete: propTypes.object,
	dataCache: propTypes.string,
};

ListCheckBox.defaultProps = {
	title: '',
	subtitle: '',
	uri: {},
	showHeader: false,
	dataFixed: false,
};
