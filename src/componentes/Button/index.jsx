import { Button } from '@mui/material';

const ButtonCustomized = ({
	label,
	name,
	icono,
	classesCustom,
	onClick,
	border,
	isSubmit,
}) => {
	return (
		<div>
			<button
				name={name}
				onClick={onClick}
				type={isSubmit ? 'submit' : 'button'}
				className='text-white w-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 '
			>
				{label}
			</button>
		</div>
	);
};

export default ButtonCustomized;
