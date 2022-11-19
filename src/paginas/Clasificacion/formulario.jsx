import { forwardRef, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import Slide from '@mui/material/Slide';
import { GiCancel } from 'react-icons/gi';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdEdit } from 'react-icons/md';
import {
	Table,
	TableRow,
	TableHead,
	TableCell,
	TableContainer,
	TableBody,
	Tooltip,
	IconButton,
	LinearProgress,
} from '@mui/material';

import Button from '../../componentes/Button';
import { filters } from '../../helpers/constants';
import useFormActions from '../../hooks/useForm';
import { ClasificacionActions, Validate } from '../../actions';
import { EmptyRows } from '../../componentes/EmptyRows/component';
import { TextFieldController } from '../../componentes/Formulario';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

export const Clasificacion = ({ handleClose, open }) => {
	const [idClasificacion, setIDClasificacion] = useState('');
	const [data, setData] = useState([]);
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(Validate),
		defaultValues: { descripcion: '' },
	});

	const { loading, isLoading, actionForm } = useFormActions({
		method: idClasificacion ? 'update' : 'create',
		actions: ClasificacionActions,
		operation: 'getAllCountClasificacion',
		name: 'clasificaion',
		reset,
		id: idClasificacion,
		redirect: false,
	});

	useQuery(ClasificacionActions.GET, {
		variables: { ...filters },
		onCompleted: (data) => {
			setData(data?.getAllCountClasificacion?.rows);
		},
	});

	const onSubmit = async (data) => {
		await actionForm({
			variables: { updateID: idClasificacion, ...data },
		});
		handleClose();
		reset({ descripcion: '' });
	};

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			onClose={handleClose}
			sx={{ maxHeight: 590 }}
		>
			{loading && <LinearProgress />}
			<DialogTitle>Agregue una clasificación de herremientas</DialogTitle>
			<DialogContent>
				<div className="col-span-6 sm:col-span-2 mb-2">
					<TextFieldController
						autoFocus
						label="Nombre"
						name="descripcion"
						control={control}
						error={errors.descripcion}
					/>
				</div>
				<br />
				<div className="col-span-6 sm:col-span-2">
					<TableContainer sx={{ overflowY: 'auto', maxHeight: 290 }}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>DECRIPCIÓN</TableCell>
									<TableCell>ACCIÓN</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.length > 0 ? (
									data.map((item, index) => (
										<TableRow key={item.id}>
											<TableCell aling="left">{item.descripcion}</TableCell>
											<TableCell>
												<>
													<Tooltip
														title="Editar"
														placement="left"
														arrow
														onClick={() => setIDClasificacion(item.id)}
													>
														<IconButton>
															<MdEdit size={20} className="text-red-600" />
														</IconButton>
													</Tooltip>
												</>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell align="left" colSpan={23}>
											<EmptyRows />
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</DialogContent>
			<DialogActions sx={{ marginRight: 2 }}>
				<Button
					onClick={() => {
						handleClose();
						reset({ descripcion: '' });
					}}
					label="Cancelar"
					fullWidth
					icono={<GiCancel size={16} />}
				/>
				<Button
					onClick={handleSubmit(onSubmit)}
					label="Guardar"
					fullWidth
					loading={isLoading}
					icono={<FiSave size={16} />}
				/>
			</DialogActions>
		</Dialog>
	);
};
