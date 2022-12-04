import { Controller } from 'react-hook-form';
import SelectField from '../SelectField';

export const SelectFieldController = ({
	control,
	name,
	labelProp,
	label,
	options,
	error,
	loading,
	customLabel,
	messageError,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value, name } }) => (
				<SelectField
					labelProp={labelProp}
					name={name}
					loading={loading}
					label={label}
					onChange={onChange}
					value={value || ''}
					options={options}
					error={error}
					customLabel={customLabel}
					messageError={messageError}
				/>
			)}
		/>
	);
};
