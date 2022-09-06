import { ToastContainer } from 'react-toastify';

const contextClass = {
	success: 'bg-blue-600',
	error: 'bg-red-600',
	info: 'bg-gray-600',
	warning: 'bg-orange-400',
	default: 'bg-indigo-600',
	dark: 'bg-white-600 font-gray-300',
};

const ToasCustomized = () => {
	return (
		<ToastContainer
			pauseOnFocusLoss={false}
			toastClassName={({ type }) =>
				contextClass[type || 'default'] +
				' relative flex p-2 min-h-12 rounded-md overflow-hidden cursor-pointer'
			}
			bodyClassName={'text-xs'}
			autoClose={3000}
			limit={1}
			icon={false}
			position='top-right'
		/>
	);
};

export default ToasCustomized;
