import { useRef, useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { parseError } from '../helpers';

export const useFormularion = (
	{ action },
	{ filter, id },
	dataInicial,
	dataCache,
	gqlPost,
	gqlUpdate,
	gqlGet,
	gqlGetByID,
	handleClose,
) => {
	const formikRef = useRef(null);

	const [dataForm, setDataForm] = useState({ ...dataInicial });
	const [getByID, { loading }] = useLazyQuery(gqlGetByID, {
		fetchPolicy: 'no-cache',
		onCompleted: (response) => {
			setDataForm(Object.values(response)[0]);
		},
	});

	useEffect(() => {
		id && getByID({ variables: { [filter]: id } });
	}, [id]);

	const method = action === 'create' ? gqlPost : gqlUpdate;
	const [ActionForm, { loading: isLoading }] = useMutation(method, {
		update: (cache, { data: response }) => {
			try {
				if (action === 'update') return false;
				const dataResponse = response[Object.keys(response)[0]];
				const oldQuery = cache.readQuery({
					query: gqlGet,
					variables: {
						offset: null,
						limit: null,
						txtBusqueda: '',
					},
				});
				cache.writeQuery({
					query: gqlGet,
					variables: {
						offset: null,
						limit: null,
						txtBusqueda: '',
					},
					data: {
						[dataCache]: {
							...oldQuery[dataCache],
							count: oldQuery[dataCache].count + 1,
							rows: [dataResponse.respuesta, ...oldQuery[dataCache].rows],
						},
					},
				});
			} catch (error) {
				return error;
			}
		},
		onCompleted: (response) => {
			toast.success(Object.values(response)[0].mensaje);
			formikRef.current.resetForm();
			if (handleClose) {
				handleClose();
			}
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

	const submitForm = () => {
		formikRef.current.submitForm();
	};

	return {
		formikRef,
		dataForm,
		ActionForm,
		submitForm,
		loading,
		isLoading,
	};
};
