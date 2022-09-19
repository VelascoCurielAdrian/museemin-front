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
import { FaToolbox } from "react-icons/fa";
import { VscTools } from "react-icons/vsc";
import { LinkButton } from "../LinkButton/container";
import paleta from "../../configuracion/paleta";

export const NavItems = (props) => {
	const [open, setOpen] = useState(false);
	const [openAlmacen, setOpenAlmacen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleClickAlmacen = () => {
		setOpenAlmacen(!openAlmacen);
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
				<ListItemText primary='Inventario' />
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
						label='Paquetes'
						handleClick={props.handleClick}
					/>
				</List>
			</Collapse>
			<ListItemButton onClick={handleClickAlmacen}>
				<ListItemIcon>
					<MdStoreMallDirectory size={17} />
				</ListItemIcon>
				<ListItemText primary='Almacén' />
				{openAlmacen ? <MdExpandLess /> : <MdExpandMore />}
			</ListItemButton>
			<Collapse in={openAlmacen} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					<LinkButton
						icon={<VscTools />}
						url='/herramientas'
						label='Herramientas'
						handleClick={props.handleClick}
					/>
				</List>
			</Collapse>
		</List>
	);
};
