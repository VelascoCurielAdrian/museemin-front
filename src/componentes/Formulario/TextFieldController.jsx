import { Controller } from 'react-hook-form';
import TextField from '../TextField';

export const TextFieldController = ({
	name,
	control,
	error,
	label,
	type,
	rows,
	variant,
	onChangeCustom,
	messageError,
	autoFocus,
	disabled,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => (
				<TextField
					fullWidth
					variant={variant}
					onChange={(e) => {
						const value = e.target.value;
						if (onChangeCustom) {
							onChange(onChangeCustom(e));
						} else {
							onChange(value);
						}
					}}
					value={value}
					name={name}
					label={label}
					error={error}
					messageError={messageError}
					type={type}
					rows={rows}
					disabled={disabled}
					autoFocus={autoFocus}
				/>
			)}
		/>
	);
};
