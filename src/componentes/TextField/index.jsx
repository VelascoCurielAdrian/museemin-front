import { memo } from 'react';
import propTypes from 'prop-types';
import { TextField as Input } from '@mui/material';
import { styled } from '@mui/material/styles';

const CssTextField = styled(Input)(({ theme }) => ({
	'& input': {
		color: '#263238',
		backgroundColor: '#fafafa',
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
	helperText,
	inputProps,
	inputStyles,
	placeHolder,
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
				htmlFor='label-form'
				className='block mb-2 text-sm font-medium text-gray-700'
			>
				{label}
			</label>
			{variant !== 'multiline' ? (
				<CssTextField
					size={size}
					name={name}
					type={type}
					value={value}
					error={error}
					autoFocus={autoFocus}
					disabled={disabled}
					required={required}
					onKeyDown={onKeyDown}
					className={className}
					fullWidth={fullWidth}
					InputProps={inputProps}
					helperText={helperText}
					placeholder={placeHolder}
					onChange={customOnChange}
					// {...inputProps}
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
					helperText={helperText}
					placeholder={placeHolder}
					onChange={customOnChange}
					// {...inputProps}
				/>
			)}
		</div>
	);
};

TextField.propTypes = {
	label: propTypes.string,
	value: propTypes.oneOfType([propTypes.string, propTypes.number]),
	name: propTypes.string.isRequired,
	type: propTypes.string,
	onChange: propTypes.func,
	isHandleChange: propTypes.bool,
	inputProps: propTypes.object,
	required: propTypes.bool,
	tooltip: propTypes.string,
	rows: propTypes.number,
	helperText: propTypes.string,
	placeHolder: propTypes.string,
	className: propTypes.string,
	onKeyDown: propTypes.func,
	disabled: propTypes.bool,
	inputClassName: propTypes.string,
	inputStyles: propTypes.object,
};

TextField.defaultProps = {
	label: '',
	value: '',
	name: '',
	type: 'text',
	isHandleChange: false,
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
		prev.helperText === next.helperText &&
		prev.disabled === next.disabled &&
		prev.tooltip === next.tooltip &&
		prev.onChange === next.onChange
	);
});
