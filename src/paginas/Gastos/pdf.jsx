import { format } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { tiposMetodoPago, unidades } from '../../helpers/constants';
import logo from '../../assets/Logo.png';
import moment from 'moment/moment';
import 'moment/locale/es';

export const formatPdfGasto = (data) => {
	const {
		DetalleGastos,
		trabajador,
		tipoGasto,
		cliente,
		descripcion,
		fecha,
		subTotal,
		importe,
		diferencia,
		total,
		metodoPago,
		id,
	} = data;
	const columns = [
		{ title: 'Descripcion', dataKey: 'descripcion' },
		{ title: 'Unidad', dataKey: 'unidad' },
		{ title: 'Precio', dataKey: 'precio' },
		{ title: 'Cantidad', dataKey: 'cantidad' },
		{ title: 'Precio Parcial', dataKey: 'precioParcial' },
	];
	const rows = DetalleGastos?.map((data) => {
		const tipoUnidad = unidades.find(
			(tipo) => tipo.id === data?.unidad,
		)?.nombre;
		return {
			...data,
			unidad: tipoUnidad,
		};
	});

	const doc = new jsPDF('p', 'pt');
	doc.setFontSize(20);
	doc.setTextColor(40);
	doc.autoTable(columns, rows, {
		startY: 110,
		margin: { horizontal: 10 },
		styles: { overflow: 'linebreak' },
		bodyStyles: { valign: 'top' },
		columnStyles: { email: { columnWidth: 'wrap' } },
		theme: 'striped',
		showHead: 'everyPage',
		didDrawPage: function (data) {
			const gasto =
				tipoGasto === 2 ? 'Interno' : `Externo dirigido a ${cliente?.nombre}`;
			doc.addImage(logo, 'JPEG', data.settings.margin.left, 15, 135, 60);
			doc.setFontSize(10);
			doc.setTextColor('#161C22');
			doc.text(`Fecha: ${moment(fecha).format('LLLL')}`, 150, 19);
			doc.text(`Folio: 000-G0${id}`, 500, 17.5);
			doc.text(`Gasto: ${gasto}`, 150, 35);
			doc.text(
				`A cargo del trabajador: ${trabajador?.nombres} ${trabajador?.primerApellido} ${trabajador?.segundoApellido}`,
				150,
				50,
			);
			doc.text(
				`Metodo de pago: ${
					tiposMetodoPago.find((el) => el.id === metodoPago)?.nombre
				}`,
				150,
				65,
			);
			doc.setFontSize(11);
			doc.text('Detalle de los gastos agregados', 15, 90);
			let str = '' + doc.internal.getNumberOfPages();
			doc.setFontSize(10);
			let pageSize = doc.internal.pageSize;
			let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
			doc.text('Footer text', data.settings.margin.left, pageHeight - 10);
			doc.text(575, 830, str);
		},
	});

	let finalY = doc.lastAutoTable.finalY;
	doc.setFontSize(10);
	doc.text(`Comentarios`, 15, finalY + 30);
	doc.setFontSize(9);
	doc.text(`${descripcion}`, 15, finalY + 50);
	doc.text(400, finalY + 30, 'Sub Total');
	doc.text(500, finalY + 30, `$: ${subTotal}`);
	doc.text(400, finalY + 50, 'Importe');
	doc.text(500, finalY + 50, `$: ${importe}`);
	doc.text(400, finalY + 70, 'Importe del trabajador');
	doc.text(500, finalY + 70, `$: ${diferencia}`);
	doc.text(400, finalY + 90, 'Total');
	doc.text(500, finalY + 90, `$: ${total}`);

	doc.save(`Gasto-${format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS")}.pdf`);
};
