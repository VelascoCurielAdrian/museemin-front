import { memo } from 'react';
import clsx from 'clsx';
import propTypes from 'prop-types';
import Typography from '../Typography';
import { regexValid } from '../../helpers/regex';

const TextField = ({
	label,
	value,
	name,
	type,
	onChange,
	isHandleChange,
	inputProps,
	required,
	showIcon,
	rows,
	placeHolder,
	className,
	onKeyDown,
	disabled,
	inputStyles,
	iconCustomized,
	error,
}) => {
	const customOnChange = (e) => {
		if (regexValid(e) && onChange)
			if (isHandleChange)
				onChange((current) => ({ ...current, [name]: e.target.value }));
			else onChange(e);
	};
	return (
		<div>
			<Typography
				className={clsx(
					'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500',
					error?.estatus === 'error' &&
						'block mb-2 text-sm font-medium text-red-700 dark:text-red-500',
					error?.estatus === 'success' &&
						'block mb-2 text-sm font-medium text-green-700 dark:text-green-500',
					className,
				)}
			>
				{label}
			</Typography>
			{type !== 'textTarea' ? (
				<div className='relative mb-1'>
					<div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
						{iconCustomized}
					</div>
					<input
						id='success'
						className={clsx(
							'bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500',
							showIcon === true &&
								'bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5',
							error?.estatus === 'error' &&
								' bg-red-50 border border-red-500 text-gray-800 placeholder-red-700 text-sm rounded-lg focus:ring-red-500  focus:border-red-500 block w-full p-2.5  dark:placeholder-red-500 dark:border-red-500',
							error?.estatus === 'success' &&
								'bg-green-50 border border-green-500 text-gray-800  placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:border-green-500',
							className,
						)}
						style={inputStyles}
						value={value || ''}
						name={name}
						type={type}
						onChange={customOnChange}
						required={required}
						placeholder={placeHolder}
						onKeyDown={onKeyDown}
						disabled={disabled}
						{...inputProps}
					/>
				</div>
			) : (
				<div className='relative mb-1'>
					<div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
						{iconCustomized}
					</div>
					<textarea
						id='success'
						className={clsx(
							'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-blue-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500',
							showIcon === true &&
								'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5',
							error?.estatus === 'error' &&
								' bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500  focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',
							error?.estatus === 'success' &&
								'bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:border-green-500',
							className,
						)}
						value={value || ''}
						name={name}
						type={type}
						rows={rows}
						onChange={customOnChange}
						required={required}
						placeholder={placeHolder}
						onKeyDown={onKeyDown}
						disabled={disabled}
						style={{
							...inputStyles,
							resize: 'none',
							padding: 5,
						}}
						{...inputProps}
					/>
				</div>
			)}
			<Typography
				component='p'
				className={clsx(
					error?.estatus === 'success' &&
						'mt-2 text-sm text-green-600 dark:text-green-500',
					error?.estatus === 'error' &&
						'mt-2 text-sm text-red-600 dark:text-red-500',
				)}
			>
				{error?.estatus && (
					<span className='font-medium'>
						{Object.values(error?.mensaje) || ''}
					</span>
				)}
			</Typography>
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
