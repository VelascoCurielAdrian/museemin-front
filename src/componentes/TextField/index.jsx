const TextField = ({
	textLabel,
	value,
	name,
	type,
	onChange,
	isHandleChange,
	inputProps,
	required,
	error,
	tooltip,
	rows,
	htmlFor,
	helperText,
	placeHolder,
	className,
	onKeyDown,
	disabled,
	inputClassName,
	inputStyles,
	simbolo,
}) => {
	const customOnChange = (e) => {
		if (regexValid(e) && onChange)
			if (isHandleChange)
				onChange((current) => ({ ...current, [name]: e.target.value }));
			else onChange(e);
	};
	return (
		<div className='mb-6'>
			<label
				className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
			>
				{textLabel}
			</label>
			
			<input
				id='success'
				className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
			{/* <p className='mt-2 text-sm text-green-600 dark:text-green-500'>
				<span className='font-medium'>Well done!</span> Some success messsage.
			</p> */}
		</div>
	);
};

export default TextField;
