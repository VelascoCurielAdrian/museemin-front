import propTypes from 'prop-types';
import {
	CircularProgress,
	FormControl,
	FormHelperText,
	InputAdornment,
	LinearProgress,
	MenuItem,
	Select,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './styles';

const CssSelect = styled(Select)(({ theme }) => ({
	color: '#263238',
	backgroundColor: '#E9EEFA',
	'& MuiNativeSelect-select': {
		color: '#212121',
		borderWidth: 1,
		borderRadius: 10,
	},
}));

const SelectField = ({
	label,
	value,
	name,
	onChange,
	isHandleChange,
	required,
	error,
	labelProp,
	options,
	valueProp,
	multiple,
	customLabel,
	disabled,
	onClick,
	messageError,
	IconComponent,
	placeHolder,
	inputStyles,
	loading,
}) => {
	const classes = styles();
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
			<FormControl fullWidth error={!!error}>
				<CssSelect
					variant="outlined"
					disabled={disabled}
					size="small"
					fullWidth
					onChange={customOnChange}
					IconComponent={IconComponent}
					name={name}
					displayEmpty={placeHolder ? true : false}
					value={value}
					multiple={multiple}
					required={required}
					onClick={onClick}
				>
					{ loading && <LinearProgress/> }
					{options.map((option, index) => (
						<MenuItem
							key={index}
							className={classes.li}
							value={valueProp ? option[valueProp] : option}
						>
							{customLabel ? customLabel(option) : option[labelProp]}
						</MenuItem>
					))}
					{options.length === 0 && (
						<MenuItem disabled>Sin elementos para mostrar</MenuItem>
					)}
				</CssSelect>
				<FormHelperText>{messageError && error?.message}</FormHelperText>
			</FormControl>
		</div>
	);
};

SelectField.propTypes = {
	label: propTypes.string,
	value: propTypes.oneOfType([
		propTypes.string,
		propTypes.number,
		propTypes.bool,
		propTypes.array,
	]),
	name: propTypes.string.isRequired,
	onChange: propTypes.func,
	isHandleChange: propTypes.bool,
	messageError: propTypes.bool,
	required: propTypes.bool,
	error: propTypes.oneOfType([
		propTypes.string,
		propTypes.bool,
		propTypes.object,
	]),
	tooltip: propTypes.string,
	className: propTypes.string,
	labelProp: propTypes.string,
	options: propTypes.array.isRequired,
	valueProp: propTypes.string,
	multiple: propTypes.bool,
	onDelete: propTypes.func,
	customLabel: propTypes.func,
	IconComponent: propTypes.func,
	styleComponent: propTypes.string,
	style: propTypes.object,
	disabled: propTypes.bool,
	onClick: propTypes.func,
	placeHolder: propTypes.string,
	placeHolderColor: propTypes.string,
	displayTextStyles: propTypes.object,
};

SelectField.defaultProps = {
	label: '',
	value: '',
	isHandleChange: false,
	messageError: true,
	required: false,
	error: false,
	tooltip: '',
	className: '',
	labelProp: 'label',
	valueProp: 'id',
	multiple: false,
	customLabel: null,
	onDelete: null,
	style: {},
	disabled: false,
	placeHolderColor: 'black',
	displayTextStyles: {},
};

export default SelectField;
