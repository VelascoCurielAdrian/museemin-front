import { List } from '@mui/material';
import { MdBackpack } from 'react-icons/md';
import { GrServices } from 'react-icons/gr';
import {
	FaToolbox,
	FaUserTie,
	FaMoneyBillAlt,
	FaUsersCog,
	FaTools,
	FaCashRegister,
} from 'react-icons/fa';
import { LinkButton } from '../LinkButton/container';

export const NavItems = (props) => {
	return (
		<List
			sx={{
				width: '100%',
				height: '100%',
			}}
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
				url="/servicios"
				label="Servicios"
				handleClick={props.handleClick}
			/>
			<LinkButton
				icon={<FaMoneyBillAlt />}
				url="/gastos"
				label="Gastos"
				handleClick={props.handleClick}
			/>

			<LinkButton
				icon={<FaCashRegister />}
				url="/cotizaciones"
				label="Cotizaciones"
				handleClick={props.handleClick}
			/>
		</List>
	);
};
