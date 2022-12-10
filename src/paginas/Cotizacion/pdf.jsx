import { format } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { unidades } from '../../helpers/constants';
import logo from '../../assets/Logo.png';
import moment from 'moment/moment';
import 'moment/locale/es';

export const formatPdCotizacion = (data) => {
	console.log(data);
	const {
		CotizacionDetalles,
		cliente,
		descripcion,
		fecha,
		subTotal,
		id,
	} = data;
	const columns = [
		{ title: 'Descripcion', dataKey: 'descripcion' },
		{ title: 'Unidad', dataKey: 'unidad' },
		{ title: 'Precio', dataKey: 'precio' },
		{ title: 'Cantidad', dataKey: 'cantidad' },
		{ title: 'Importe', dataKey: 'importe' },
	];
	const rows = CotizacionDetalles?.map((data) => {
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
		columnStyles: { email: { cellWidth: 'wrap' } },
		theme: 'striped',
		showHead: 'everyPage',
		didDrawPage: function (data) {
			const cotizacion = `Dirigido a ${cliente?.nombre}`;
			doc.addImage(logo, 'JPEG', data.settings.margin.left, 15, 135, 60);
			doc.setFontSize(10);
			doc.setTextColor('#161C22');
			doc.text(`Fecha: ${moment(fecha).format('LLLL')}`, 150, 19);
			doc.text(`Folio: 000-C0${id}`, 500, 17.5);
			doc.text(`Cliente: ${cotizacion}`, 150, 35);
			doc.setFontSize(11);
			doc.text('Detalle de la cotización', 15, 90);
			let str = '' + doc.internal.getNumberOfPages();
			doc.setFontSize(10);
			let pageSize = doc.internal.pageSize;
			let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
			doc.text('Museemin', data.settings.margin.left, pageHeight - 10);
			doc.text(575, 830, str);
		},
	});

	let finalY = doc.lastAutoTable.finalY;
	doc.setFontSize(10);
	doc.text(`Comentarios`, 15, finalY + 30);
	doc.setFontSize(9);
	doc.text(`${descripcion}`, 15, finalY + 50);
	doc.text(400, finalY + 30, 'Precio estimado');
	doc.text(500, finalY + 30, `$: ${subTotal}`);

	doc.save(`Cotización-${format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS")}.pdf`);
};
