import { MobileDatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { Controller } from 'react-hook-form';
import TextField from '../TextField';

export const DatePickerController = ({ control, name, label }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => (
				<MobileDatePicker
					name={name}
					value={value}
					onChange={(value) => {
						const fecha = format(value, "yyyy-MM-dd'T'HH:mm:ss.SSS");
						onChange(fecha);
					}}
					renderInput={(params) => (
						<TextField
							required
							{...params}
							size="small"
							fullWidth
							name={name}
							label={label}
							value={params.inputProps.value}
						/>
					)}
				/>
			)}
		/>
	);
};
