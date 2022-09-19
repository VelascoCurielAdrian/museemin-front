import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { useState } from "react";
import {
	MdExpandLess,
	MdExpandMore,
	MdInventory,
	MdBackpack,
	MdStoreMallDirectory,
} from "react-icons/md";
import { FaToolbox, FaUserFriends } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { VscTools } from "react-icons/vsc";
import { RiCustomerService2Line } from "react-icons/ri";
import { LinkButton } from "../LinkButton/container";
import paleta from "../../configuracion/paleta";

export const NavItems = (props) => {
	const [open, setOpen] = useState(false);
	const [openAlmacen, setOpenAlmacen] = useState(false);
	const [openContacto, setOpenContacto] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleClickAlmacen = () => {
		setOpenAlmacen(!openAlmacen);
	};

	const handleClickContacto = () => {
		setOpenContacto(!openContacto);
	};

	return (
		<List
			sx={{
				width: "100%",
				bgcolor: paleta.bar.iconoBorder,
				height: "100%",
				color: "#4B5D6E",
			}}
			component='nav'
		>
			<ListItemButton onClick={handleClick}>
				<ListItemIcon>
					<MdInventory />
				</ListItemIcon>
				<ListItemText primary='INVENTARIO' />
				{open ? <MdExpandLess /> : <MdExpandMore />}
			</ListItemButton>
			<Collapse
				in={open}
				timeout='auto'
				unmountOnExit
				sx={{ backgroundColor: "#fafafa" }}
			>
				<List component='div' disablePadding>
					<LinkButton
						icon={<FaToolbox />}
						url='/herramientas'
						label='Herramientas'
						handleClick={props.handleClick}
					/>
					<LinkButton
						icon={<MdBackpack />}
						url='/paqueteHerramientas'
						label='Paquete'
						handleClick={props.handleClick}
					/>
				</List>
			</Collapse>
			<ListItemButton onClick={handleClickContacto}>
				<ListItemIcon>
					<FaUserFriends />
				</ListItemIcon>
				<ListItemText primary='CONTACTOS' />
				{openContacto ? <MdExpandLess /> : <MdExpandMore />}
			</ListItemButton>
			<Collapse
				in={openContacto}
				timeout='auto'
				unmountOnExit
				sx={{ backgroundColor: "#fafafa" }}
			>
				<List component='div' disablePadding>
					<LinkButton
						icon={<GrUserWorker />}
						url='/trabajadores'
						label='Tranajadores'
						handleClick={props.handleClick}
					/>
					<LinkButton
						icon={<RiCustomerService2Line />}
						url='/clientes'
						label='Clientes'
						handleClick={props.handleClick}
					/>
				</List>
			</Collapse>
			<ListItemButton onClick={handleClickAlmacen}>
				<ListItemIcon>
					<MdStoreMallDirectory size={17} />
				</ListItemIcon>
				<ListItemText primary='ALMACÉN' />
				{openAlmacen ? <MdExpandLess /> : <MdExpandMore />}
			</ListItemButton>
			<Collapse
				in={openAlmacen}
				timeout='auto'
				unmountOnExit
				sx={{ backgroundColor: "#fafafa" }}
			>
				<List component='div' disablePadding>
					<LinkButton
						icon={<VscTools />}
						url='/herramientas'
						label='Almacén'
						handleClick={props.handleClick}
					/>
				</List>
			</Collapse>
		</List>
	);
};
