import { ToastContainer } from 'react-toastify';

const ToasCustomized = () => {
	return (
		<ToastContainer
			pauseOnFocusLoss={false}
			bodyClassName={'text-sm'}
			icon
			position="top-right"
		/>
	);
};

export default ToasCustomized;
