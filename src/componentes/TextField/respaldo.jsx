import { memo, useState } from 'react';
import propTypes from 'prop-types';
import { regexValid } from '../../helpers/regex';

const TextField = ({
	title,
	value,
	name,
	type,
	onChange,
	isHandleChange,
	inputProps,
	required,
	error,
	rows,
	helperText,
	placeHolder,
	onKeyDown,
	disabled,
}) => {
	const [touched, setTouched] = useState(false);

	const customOnChange = (e) => {
		if (regexValid(e) && onChange)
			if (isHandleChange)
				onChange((current) => ({ ...current, [name]: e.target.value }));
			else onChange(e);
	};
	console.log(touched);
	return (
		<div>
			<label
				htmlFor="label-form"
				className="block mb-2 text-sm font-medium text-gray-900"
			>
				{title}
			</label>
			{type !== 'textarea' ? (
				<>
					<input
						onChange={customOnChange}
						type={type}
						name={name}
						value={value}
						className={
							error
								? 'bg-red-50 border placeholder-red-700 text-sm rounded-lg focus:ring-red-50 focus:border-red-500 block w-full p-2.5  border-red-500'
								: '$bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500 '
						}
						required={required}
						placeholder={placeHolder}
						onBlur={() => setTouched(true)}
						onKeyDown={onKeyDown}
						disabled={disabled}
						{...inputProps}
					/>
				</>
			) : (
				<textarea
					onChange={customOnChange}
					className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					value={value || ''}
					name={name}
					type={type}
					rows={rows}
					required={required}
					placeholder={placeHolder}
					onKeyDown={onKeyDown}
					disabled={disabled}
					{...inputProps}
				/>
			)}
			{helperText && helperText !== '' && (
				<label component="p">{helperText}</label>
			)}
		</div>
	);
};

TextField.propTypes = {
	title: propTypes.string,
	value: propTypes.oneOfType([propTypes.string, propTypes.number]),
	name: propTypes.string.isRequired,
	type: propTypes.string,
	onChange: propTypes.func,
	isHandleChange: propTypes.bool,
	inputProps: propTypes.object,
	required: propTypes.bool,
	error: propTypes.oneOfType([propTypes.string, propTypes.bool]),
	tooltip: propTypes.string,
	rows: propTypes.number,
	helperText: propTypes.string,
	placeHolder: propTypes.string,
	className: propTypes.string,
	onKeyDown: propTypes.func,
	disabled: propTypes.bool,
	inputClassName: propTypes.string,
	inputStyles: propTypes.object,
	// mostrarSimbolo: propTypes.bool
};

TextField.defaultProps = {
	title: '',
	value: '',
	type: 'text',
	isHandleChange: false,
	inputProps: {},
	required: false,
	error: false,
	tooltip: '',
	rows: 1,
	helperText: '',
	placeHolder: '',
	className: '',
	onKeyDown: null,
	disabled: false,
	// mostrarSimbolo: false,
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

// export default TextField;

