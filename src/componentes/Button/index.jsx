import { Button } from '@mui/material';

const ButtonCustomized = ({ label }) => {
	return (
		<div>
			<button
				type='button'
				className='text-white w-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 '
			>
				{label}
			</button>

			{/* <Button
				type='submit'
				fullWidth
				variant='contained'
				className='bg-black font-medium dark:text-gray-300'
			>
				{label}
			</Button> */}
		</div>
	);
};

export default ButtonCustomized;
