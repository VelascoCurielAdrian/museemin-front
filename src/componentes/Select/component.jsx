import { memo } from "react";
import propTypes from "prop-types";
import {
	Chip,
	FormControl,
	FormHelperText,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from "./styles";

const CssSelect = styled(Select)(({ theme }) => ({
	color: "#263238",
	backgroundColor: "#eceff1",
	"& MuiNativeSelect-select": {
		color: "#212121",
		borderWidth: 1,
		borderRadius: 10,
	},
}));

export const SelecField = ({
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
	helperText,
	IconComponent,
	displayTextStyles,
	placeHolder,
	placeHolderColor,
	inputStyles,
	onDelete,
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
				htmlFor='label-form'
				className='block mb-2 text-sm font-medium text-gray-700'
			>
				{label}
			</label>
			<FormControl fullWidth error={error}>
				<CssSelect
					variant='outlined'
					disabled={disabled}
					size='small'
					fullWidth
					onChange={customOnChange}
					IconComponent={IconComponent}
					name={name}
					displayEmpty={placeHolder ? true : false}
					renderValue={() => {
						let option = null;
						let renderValue = null;
						if (Array.isArray(value)) {
							option = options.filter((option) =>
								value.includes(option[valueProp]),
							);
							renderValue =
								option?.map((option) => option[labelProp]).join(", ") || "";
						} else {
							option = options.find((option) => option[valueProp] === value);
							renderValue = option ? option[labelProp] : "";
						}
						if (Array.isArray(value) && onDelete) {
							option = options.filter((option) =>
								value.includes(option[valueProp]),
							);
							const total = option.length - 2;
							renderValue =
								option?.map((option, index) => {
									if (index < 2) {
										return (
											<Chip
												onMouseDown={(event) => {
													event.stopPropagation();
												}}
												key={option.id}
												label={`${option[labelProp]}`}
												className={classes.chips}
												deleteIcon={
													<AiOutlineCloseCircle
														className={classes.iconDelete}
													/>
												}
												onDelete={() => {
													onDelete(option.id, name);
												}}
											/>
										);
									}
									if (index === 2) {
										return (
											<Chip
												key={option.id}
												label={`${total} Mas..`}
												className={classes.chipsMas}
											/>
										);
									}
									return null;
								}) || "";
						}
						return (
							<Typography
								style={{
									color: placeHolderColor,
									paddingRight: "20px",
									...displayTextStyles,
								}}
							>
								{option ? renderValue : placeHolder}
							</Typography>
						);
					}}
					value={value}
					multiple={multiple}
					required={required}
					onClick={onClick}
				>
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
				<FormHelperText>{helperText}</FormHelperText>
			</FormControl>
		</div>
	);
};

SelecField.propTypes = {
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
	required: propTypes.bool,
	error: propTypes.oneOfType([propTypes.string, propTypes.bool]),
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

SelecField.defaultProps = {
	label: "",
	value: "",
	isHandleChange: false,
	required: false,
	error: false,
	tooltip: "",
	className: "",
	labelProp: "label",
	valueProp: "id",
	multiple: false,
	customLabel: null,
	onDelete: null,
	style: {},
	disabled: false,
	placeHolderColor: "black",
	displayTextStyles: {},
};

export default SelecField;
