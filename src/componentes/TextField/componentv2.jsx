import propTypes from 'prop-types';

const TextField = ({
	title,
	name,
	icon,
	type,
	inputProps,
	required,
	error,
	rows,
	placeHolder,
	onKeyDown,
	disabled,
	register,
}) => {
	return (
		<div>
			<label
				htmlFor="label-form"
				className="block mb-2 text-sm font-medium text-gray-900"
			>
				{title}
			</label>
			{type !== 'textarea' ? (
				<div className="relative">
					<div className="flex absolute inset-y-2 left-0 items-center pl-3 pointer-events-none">
						{icon}
					</div>
					<input
						className={
							error
								? `bg-red-50 border placeholder-red-700 text-sm rounded-lg focus:ring-red-50 focus:border-red-500 block w-full p-2.5 ${
										icon && 'pl-10'
								  } border-red-500`
								: `bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${
										icon && 'pl-10'
								  } p-2.5`
						}
						placeholder={placeHolder}
						onKeyDown={onKeyDown}
						disabled={disabled}
						name={name}
						{...register(`${name}`, { required })}
						{...inputProps}
					/>
				</div>
			) : (
				<textarea
					className={
						error
							? `bg-red-50 border placeholder-red-700 text-sm rounded-lg focus:ring-red-50 focus:border-red-500 block w-full p-2.5 ${
									icon && 'pl-10'
							  } border-red-500`
							: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${
									icon && 'pl-10'
							  } p-2.5`
					}
					rows={rows}
					placeholder={placeHolder}
					onKeyDown={onKeyDown}
					disabled={disabled}
					name={name}
					{...register(`${name}`, { required })}
					{...inputProps}
				/>
			)}
			{error && (
				<p className="mt-1 text-xs text-red-600  dark:text-red-500">
					<span className="font-medium">{error?.message}</span>
				</p>
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
	required: propTypes.oneOfType([propTypes.string, propTypes.bool]),
	error: propTypes.oneOfType([propTypes.object, propTypes.bool]),
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


export default TextField;
