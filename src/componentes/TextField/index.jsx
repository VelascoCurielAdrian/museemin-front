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
				htmlFor={`${htmlFor}`}
				className='block mb-2 text-sm font-medium text-sccess dark:text-green-500'
			>
				{textLabel}
			</label>
			<input
				className='bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500'
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
