import { useMutation } from "@apollo/client";
import { resolveReadonlyArrayThunk } from "graphql";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { parseError } from "../../helpers";

export const useFormularion = (
	{ action },
	dataCache,
	gqlPost,
	gqlUpdate,
	gqlGet,
	handleClose,
) => {
	const formikRef = useRef(null);
	const method = action === "create" ? gqlPost : gqlUpdate;
	const [ActionForm, { loading: isLoading }] = useMutation(method, {
		update: (cache, { data: response }) => {
			const dataResponse = response[Object.keys(response)[0]];
			const oldQuery = cache.readQuery({
				query: gqlGet,
				variables: {
					offset: null,
					limit: null,
				},
			});
			cache.writeQuery({
				query: gqlGet,
				variables: {
					offset: null,
					limit: null,
				},
				data: {
					[dataCache]: {
						...oldQuery[dataCache],
						count: oldQuery[dataCache].count + 1,
						rows: [dataResponse.respuesta, ...oldQuery[dataCache].rows],
					},
				},
			});
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
				if (name === "BAD_USER_INPUT") {
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
		ActionForm,
		submitForm,
		isLoading,
	};
};
