import { useWatch } from 'react-hook-form';

const getTotal = ({ diferencia, subTotal, importe }) => {
	return parseFloat(importe) - parseFloat(subTotal) + parseFloat(diferencia);
};

const TotalGasto = ({ control, setValue }) => {
	const diferencia = useWatch({ control, name: 'diferencia' });
	const subTotal = useWatch({ control, name: 'subTotal' });
	const importe = useWatch({ control, name: 'importe' });
	const result = getTotal({ diferencia, subTotal, importe });

	setValue('total', result);
	return <p>${result || '0.00'}</p>;
};

export const Totals = ({ control, setValue }) => {
	const diferencia = useWatch({ control, name: 'diferencia' });
	const subTotal = useWatch({ control, name: 'subTotal' });
	const importe = useWatch({ control, name: 'importe' });
	return (
		<dl>
			<div className="bg-white px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-1">
				<dt className="text-sm font-bold text-gray-500">Sub Total</dt>
				<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-20">
					${subTotal || '0.00'}
				</dd>
			</div>
			<div className="border-t border-gray-300" />
			<div className="bg-white px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-1">
				<dt className="text-sm font-bold text-gray-500">Importe</dt>
				<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-20">
					${importe || '0.00'}
				</dd>
			</div>
			<div className="border-t border-gray-300" />
			<div className="bg-white px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-1">
				<dt className="text-sm font-bold text-gray-500">
					Importe del trabajador
				</dt>
				<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-20">
					${diferencia || '0.00'}
				</dd>
			</div>
			<div className="border-t border-gray-300" />
			<div className="bg-white px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-1">
				<dt className="text-sm font-bold text-gray-500">Total</dt>
				<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-20">
					<TotalGasto control={control} setValue={setValue} />
				</dd>
			</div>
		</dl>
	);
};
