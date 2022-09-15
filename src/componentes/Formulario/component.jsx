import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { parseError } from "../../helpers";
import GQL from "./../../paginas/Clasificacion/helper";

export const Formulario = ({
	ref,
	initialValues,
	validationSchema,
	Children,
}) => {
	const [createClasificacion, { loading: loadingCreate }] = useMutation(
		GQL.CREATE,
		{
			update: (cache, { data: response }) => {
				const dataResponse = response[Object.keys(response)[0]];
				const oldQuery = cache.readQuery({
					query: GQL.GET,
					variables: {
						offset: null,
						limit: null,
					},
				});
				cache.writeQuery({
					query: GQL.GET,
					variables: {
						offset: null,
						limit: null,
					},
					data: {
						getAllCountClasificacion: {
							...oldQuery["getAllCountClasificacion"],
							count: oldQuery["getAllCountClasificacion"].count + 1,
							rows: [
								dataResponse.respuesta,
								...oldQuery["getAllCountClasificacion"].rows,
							],
						},
					},
				});
			},
		},
	);

	return (
		<Formik
			innerRef={ref}
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				const input = {
					descripcion: values.nombre,
					usuarioRegistroID: 1,
					estatus: true,
				};
				createClasificacion({
					variables: { input },
				});
			}}
		>
			{Children}
		</Formik>
	);
};
