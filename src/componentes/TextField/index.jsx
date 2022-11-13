import { memo } from 'react';
import PropTypes from 'prop-types';
import { TextField as Input } from '@mui/material';
import { styled } from '@mui/material/styles';

const CssTextField = styled(Input)(({ theme }) => ({
	'& input': {
		color: '#263238',
		backgroundColor: '#E9EEFA',
		borderWidth: 1,
		borderRadius: 10,
	},
	'& input:valid + fieldset': {
		color: '#212121',
		borderWidth: 1,
		borderRadius: 10,
	},
	'& input:invalid + fieldset': {
		borderWidth: 1,
		borderRadius: 10,
	},
	'& input:valid:focus + fieldset': {
		borderWidth: 1,
		borderRadius: 10,
	},
	transition: theme.transitions.create([
		'border-color',
		'background-color',
		'box-shadow',
	]),
}));

const TextField = ({
	name,
	size,
	type,
	rows,
	error,
	label,
	value,
	variant,
	onChange,
	required,
	disabled,
	autoFocus,
	fullWidth,
	className,
	onKeyDown,
	inputProps,
	inputStyles,
	placeHolder,
	messageError,
	isHandleChange,
}) => {
	const customOnChange = (e) => {
		if (isHandleChange)
			onChange((current) => ({ ...current, [name]: e.target.value }));
		else onChange(e);
	};
	return (
		<div style={inputStyles}>
			<label
				htmlFor="label-form"
				className="block mb-2 text-sm font-medium text-gray-700"
			>
				{label}
			</label>
			{variant !== 'multiline' ? (
				<CssTextField
					size={size}
					name={name}
					type={type}
					value={value || ''}
					error={!!error}
					autoFocus={autoFocus}
					disabled={disabled}
					required={required}
					onKeyDown={onKeyDown}
					className={className}
					fullWidth={fullWidth}
					InputProps={inputProps}
					helperText={messageError && error?.message}
					placeholder={placeHolder}
					onChange={customOnChange}
				/>
			) : (
				<CssTextField
					multiline
					size={size}
					name={name}
					label={label}
					value={value}
					error={error}
					maxRows={rows}
					disabled={disabled}
					required={required}
					onKeyDown={onKeyDown}
					className={className}
					fullWidth={fullWidth}
					InputProps={inputProps}
					helperText={!messageError && error?.message}
					placeholder={placeHolder}
					onChange={customOnChange}
				/>
			)}
		</div>
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
	rows: 1,
	helperText: '',
	placeHolder: '',
	className: '',
	onKeyDown: null,
	disabled: false,
	style: {},
};

export default memo(TextField, (prev, next) => {
	return (
		prev.value === next.value &&
		prev.error === next.error &&
		prev.disabled === next.disabled &&
		prev.onChange === next.onChange
	);
});
