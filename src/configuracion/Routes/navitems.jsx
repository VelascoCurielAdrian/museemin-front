/* eslint-disable object-curly-newline */
import React from "react";
import { FaHome } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";

export default [
	{
		id: 1,
		path: "/home",
		label: "Inicio",
		icon: <FaHome size={18} />,
		open: false,
	},
	{
		id: 2,
		label: "Contactos",
		icon: <GrUserWorker size={18} />,
		open: false,
		childrens: [
			{ path: "/trabajadores", label: "Trabajadores", id: 20 },
			{ path: "/clientes", label: "Clientes", id: 21 },
		],
	},
	{
		id: 3,
		label: "Inventario",
		icon: <MdInventory size={18} />,
		open: false,
		childrens: [
			{ path: "/herramientas/", label: "Herramientas" },
			{ path: "/paqueteHerramientas/", label: "Paquete de Herramientas" },
		],
	},
];
