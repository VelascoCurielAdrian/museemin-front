import { ToastContainer } from 'react-toastify';

const ToasCustomized = () => {
	return (
		<ToastContainer
			pauseOnFocusLoss={false}
			bodyClassName={'text-sm'}
			autoClose={2000}
			limit={1}
			icon
			position="top-right"
		/>
	);
};

export default ToasCustomized;
