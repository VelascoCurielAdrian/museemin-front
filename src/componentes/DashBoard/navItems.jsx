import { List } from '@mui/material';
import { FaUsersCog, FaTools } from 'react-icons/fa';
import { useState } from 'react';
import { MdBackpack } from 'react-icons/md';
import { GrServices } from 'react-icons/gr';
import { FaToolbox, FaUserTie, FaMoneyBillAlt } from 'react-icons/fa';
import { LinkButton } from '../LinkButton/container';
import paleta from '../../configuracion/paleta';

export const NavItems = (props) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<List
			sx={{
				width: '100%',
				bgcolor: paleta.bar.iconoBorder,
				height: '100%',
				color: '#4B5D6E',
			}}
			component="nav"
		>
			<LinkButton
				icon={<FaTools />}
				url="/herramientas"
				label="Herramientas"
				handleClick={props.handleClick}
			/>
			<LinkButton
				icon={<MdBackpack />}
				url="/paqueteHerramientas"
				label="Paquete"
				handleClick={props.handleClick}
			/>
			<LinkButton
				icon={<FaUsersCog />}
				url="/trabajadores"
				label="Trabajadores"
				handleClick={props.handleClick}
			/>
			<LinkButton
				icon={<FaUserTie />}
				url="/clientes"
				label="Clientes"
				handleClick={props.handleClick}
			/>
			<LinkButton
				icon={<FaToolbox />}
				url="/almacen"
				label="Almacén"
				handleClick={props.handleClick}
			/>
			<LinkButton
				icon={<GrServices />}
				url="/servicio"
				label="Servicios"
				handleClick={props.handleClick}
			/>
			<LinkButton
				icon={<FaMoneyBillAlt />}
				url="/gastos"
				label="Gastos"
				handleClick={props.handleClick}
			/>
		</List>
	);
};
