import Typography from '../Typography';

const CheckBox = ({ label }) => {
	return (
		<div className='flex items-center mb-4'>
			<input
				id='default-checkbox'
				type='checkbox'
				value=''
				className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
			/>
			<Typography className='ml-1 font-medium text-gray-900 dark:text-gray-500'>
				{label}
			</Typography>
		</div>
	);
};

export default CheckBox;
