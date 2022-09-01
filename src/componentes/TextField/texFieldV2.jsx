import { memo } from 'react';
import clsx from 'clsx';
import propTypes from 'prop-types';
import { TextField as Input } from '@mui/material';
import { styled } from '@mui/material/styles';

const CssTextField = styled(Input)(({ theme }) => ({
  '& input:valid + fieldset': {
    borderColor: '#0d47a1',
    borderWidth: 2,
    borderRadius: 15,
  },
  '& input:invalid + fieldset': {
    borderWidth: 2,
    borderRadius: 15,
    border: '1px solid',    
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 5,
    borderWidth: 2,
    borderRadius: 15,
  },
  transition: theme.transitions.create([
    'border-color',
    'background-color',
    'box-shadow',
  ]),
}));

const TextField = ({
	id,
	name,
  size,
	type,
	rows,
	error,
	label,
	value,
	onChange,
	required,
	showIcon,
	disabled,
	fullWidth,
	className,
	onKeyDown,
	helperText,
	inputProps,
	inputStyles,
	placeHolder,
	isHandleChange,
	iconCustomized,
}) => {
	const customOnChange = (e) => {
		if (isHandleChange)
			onChange((current) => ({ ...current, [name]: e.target.value }));
		else onChange(e);
	};
	return (
		<CssTextField
      size={size}
			id={id}
			name={name}
			label={label}
			value={value}
			error={error}
      fullWidth={fullWidth}
      InputProps={inputProps}
			helperText={helperText}
      onChange={customOnChange}
		/>
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
