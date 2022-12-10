import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import TextField from '../TextField';

export const TextFieldController = ({
	name,
	control,
	error,
	label,
	type,
	rows,
	variant,
	placeHolder,
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
					placeHolder={placeHolder}
				/>
			)}
		/>
	);
};

TextField.propTypes = {
	label: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
	]),
	error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	onChange: PropTypes.func,
	isHandleChange: PropTypes.bool,
	inputProps: PropTypes.object,
	required: PropTypes.bool,
	tooltip: PropTypes.string,
	rows: PropTypes.number,
	helperText: PropTypes.string,
	placeHolder: PropTypes.string,
	className: PropTypes.string,
	onKeyDown: PropTypes.func,
	disabled: PropTypes.bool,
	messageError: PropTypes.bool,
	inputClassName: PropTypes.string,
	inputStyles: PropTypes.object,
};

TextField.defaultProps = {
	size: 'small',
	label: '',
	value: '',
	name: '',
	type: 'text',
	isHandleChange: false,
	messageError: true,
	inputProps: {},
	required: false,
	tooltip: '',
	rows: 4,
	helperText: '',
	placeHolder: '',
	className: '',
	onKeyDown: null,
	disabled: false,
	style: {},
};

