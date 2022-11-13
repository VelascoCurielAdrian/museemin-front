import { memo } from 'react';
import { Header } from '../Header/component';

const Table = () => {
	return (
		<>
			<Header
				title="Cotización"
				subtitle="Modulo de cotizaciones"
				listado
				handleNew={() => {}}
			/>
			<div className="mt-1 flex flex-col">
				<div className="overflow-x-auto relative shadow">
					<div className="grid grid-cols-8 gap-2">
						<div className="col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12 space-y-3">
							<table className="w-full text-sm text-left text-gray-200">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="py-3 px-6">
											Product name
										</th>
										<th scope="col" className="py-3 px-6">
											Color
										</th>
										<th scope="col" className="py-3 px-6">
											Category
										</th>
										<th scope="col" className="py-3 px-6">
											Price
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th
											scope="row"
											className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											Apple MacBook Pro 17"
										</th>
										<td className="py-4 px-6">Sliver</td>
										<td className="py-4 px-6">Laptop</td>
										<td className="py-4 px-6">$2999</td>
									</tr>
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th
											scope="row"
											className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											Microsoft Surface Pro
										</th>
										<td className="py-4 px-6">White</td>
										<td className="py-4 px-6">Laptop PC</td>
										<td className="py-4 px-6">$1999</td>
									</tr>
									<tr className="bg-white dark:bg-gray-800">
										<th
											scope="row"
											className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											Magic Mouse 2
										</th>
										<td className="py-4 px-6">Black</td>
										<td className="py-4 px-6">Accessories</td>
										<td className="py-4 px-6">$99</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default memo(Table);
