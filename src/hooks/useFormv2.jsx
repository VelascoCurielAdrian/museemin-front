import { useRef, useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import propTypes from 'prop-types';
import { parseError } from '../helpers';

const useFormActions = ({
	method,
	actions,
	operation,
	formData,
	params,
	name,
	id,
}) => {
	let formRef = useRef(null);
	const navigate = useNavigate();
	const [values, setValues] = useState({ ...formData });

	const [getById, { loading }] = useLazyQuery(actions.GET_BYID, {
		fetchPolicy: 'no-cache',
		onCompleted: (response) => {
			setValues(Object.values(response)[0]);
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
			toast.success(Object.values(response)[0].mensaje);
			formRef.current.resetForm();
			navigate(`/${name}`, {
				replace: true,
			});
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

	const save = () => {
		formRef.current.submitForm();
	};

	return { save, formRef, values, loading, isLoading, actionForm };
};

export default useFormActions;

useFormActions.propTypes = {
	id: propTypes.oneOfType([propTypes.string, propTypes.number]),
	method: propTypes.string.isRequired,
	name: propTypes.string,
	params: propTypes.object,
	actions: propTypes.object.isRequired,
	formData: propTypes.object.isRequired,
	operation: propTypes.string.isRequired,
};

useFormActions.defaultProps = {
	name: '',
	params: {},
};
