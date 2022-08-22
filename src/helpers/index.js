export const parseError = (e) => {
	if (e.message.includes('Network error')) {
		return [
			{
				name: 'NETWORK_ERROR',
				message: 'El servidor no responde, intente más tarde.',
			},
		];
	}
	const parseErrors = e.graphQLErrors
		.map(({ extensions, message }) => {
			if (extensions.code === 'BAD_USER_INPUT') {
				const errors = extensions.fields.reduce(
					(object, el) => ({ ...object, [el.name]: el.message }),
					{},
				);
				return { name: extensions.code, message: errors };
			}
			if (['GENERAL_ERROR', 'PAYMENT_ERROR'].includes(extensions.code)) {
				return { name: extensions.code, message };
			}
			return null;
		})
		.filter((el) => el);
	return parseErrors;
};
