import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import propTypes from 'prop-types';
import { parseError } from '../helpers';

const useFormActions = ({
	method,
	actions,
	operation,
	params,
	name,
	reset,
	id,
	redirect,
}) => {
	const navigate = useNavigate();
	const [getById, { loading }] = useLazyQuery(actions.GET_BYID, {
		fetchPolicy: 'no-cache',
		onCompleted: (response) => {
			reset(Object.values(response)[0]);
		},
	});

	useEffect(() => {
		id && getById({ variables: { id } });
	}, [id]);

	const endpoint = method === 'create' ? actions.CREATE : actions.UPDATE;
	const [actionForm, { loading: isLoading }] = useMutation(endpoint, {
		update: (cache, { data: response }) => {
			try {
				if (method === 'update') return false;
				const dataResponse = response[Object.keys(response)[0]];
				const oldQuery = cache.readQuery({
					query: actions.GET,
					variables: { offset: null, limit: null, txtBusqueda: '', ...params },
				});
				cache.writeQuery({
					query: actions.GET,
					variables: { offset: null, limit: null, txtBusqueda: '', ...params },
					data: {
						[operation]: {
							...oldQuery[operation],
							count: oldQuery[operation].count + 1,
							rows: [dataResponse.respuesta, ...oldQuery[operation].rows],
						},
					},
				});
			} catch (error) {
				return error;
			}
		},
		onCompleted: (response) => {
			if (redirect) {
				navigate(`/${name}`, {
					replace: true,
				});
			}
			toast.success(Object.values(response)[0].mensaje);
		},
		onError: (e) => {
			const parseErrors = parseError(e);
			parseErrors.forEach(({ message, name }) => {
				if (name === 'BAD_USER_INPUT') {
					toast.error(`${Object.values(message)}`);
				}
			});
		},
	});

	return { loading, isLoading, actionForm };
};

export default useFormActions;

useFormActions.propTypes = {
	id: propTypes.oneOfType([propTypes.string, propTypes.number]),
	method: propTypes.string.isRequired,
	name: propTypes.string,
	params: propTypes.object,
	actions: propTypes.object.isRequired,
	operation: propTypes.string.isRequired,
	redirect: propTypes.bool,
};

useFormActions.defaultProps = {
	name: '',
	params: {},
	redirect: true,
};
