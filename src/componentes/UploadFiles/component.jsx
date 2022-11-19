import { Fragment, useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { snackbar } from '../../configuracion/apollo/cache';
import { Upload } from '../../configuracion/firebase/config';
const defaultSnackbar = { isOpen: true, time: 3000 };
export const UploadFile = ({ getUrl }) => {
	const [file, setFile] = useState(null);
	const [filePreview, setFilePreview] = useState('');
	const handleFile = async (e) => {
		e.preventDefault();
		try {
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				setFilePreview(reader.result);
			});
			reader.readAsDataURL(file);
			const result = await Upload(file);
			getUrl(result);
		} catch (error) {
			snackbar({
				...defaultSnackbar,
				label: 'Fallo interno intente mas tarde..',
				severity: 'error',
			});
		}
	};
	return (
		<Fragment>
			<div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
				{filePreview != '' ? (
					<div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-50">
						<img
							src={filePreview}
							alt="hola"
							className="h-full w-full object-cover object-center lg:h-full lg:w-full"
						/>
					</div>
				) : (
					<div className="space-y-1 text-center">
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 48 48"
							aria-hidden="true"
						>
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<div className="flex text-sm text-gray-600">
							<label
								htmlFor="file-upload"
								className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
							>
								<span>Subir Archivo</span>
								<input
									id="file-upload"
									name="file-upload"
									type="file"
									className="sr-only"
									accept="image/png, image/jpeg"
									onChange={(e) => setFile(e.target.files[0])}
								/>
							</label>
							<p className="pl-1">o arrastrar y soltar</p>
						</div>
						<p className="text-xs text-gray-500">PNG, JPG</p>
					</div>
				)}
			</div>
			<div className="flex">
				<button
					onClick={handleFile}
					type="button"
					className="h-6 w-25 inline-flex items-center rounded-md border border-transparent bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					<BsUpload className="-ml-2 mr-2 h-4 w-5" aria-hidden="true" />
					Subir
				</button>
				<button
					onClick={() => setFilePreview('')}
					type="button"
					className="h-6 w-25 ml-2 inline-flex items-center rounded-md border border-transparent bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					<MdCancel className="-ml-2 mr-2 h-4 w-5" aria-hidden="true" />
					Cancelar
				</button>
			</div>
		</Fragment>
	);
};
