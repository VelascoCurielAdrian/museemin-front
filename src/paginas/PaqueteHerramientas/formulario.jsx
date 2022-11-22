import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FcPlus, FcCancel } from 'react-icons/fc';
import { Header } from '../../componentes/Header/component';
import { filters, MESSAGE_REQUIRED } from '../../helpers/constants';
import { TextFieldController } from '../../componentes/Formulario';
import { UploadFile } from '../../componentes/UploadFiles/component';
import { useQuery, useReactiveVar } from '@apollo/client';
import { HerramientasActions } from '../../actions/herramientas';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, LinearProgress, Tooltip } from '@mui/material';
import { EstadoHerramienta } from '../../componentes/EstadoHerramienta/component';
import { Estatus } from '../../componentes/Estatus/component';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { SearchField } from '../../componentes/SearchField/component';
import { searchField } from '../../configuracion/apollo/cache';

function renderRow(props) {
	const { index, style } = props;

	return (
		<ListItem style={style} key={index} component="div" disablePadding>
			<ListItemButton>
				<ListItemText primary={`Item ${index + 1}`}/>
			</ListItemButton>
		</ListItem>
	);
}

export const Validate = yup.object({
	descripcion: yup.string().required(MESSAGE_REQUIRED),
});

export const PaqueteHerramienta = () => {
	const { id } = useParams();
	const [herramientas, setHerramientas] = useState([]);
	const txtBusqueda = useReactiveVar(searchField);

	const { loading: LoadingTools } = useQuery(HerramientasActions.GET, {
		variables: { ...filters, txtBusqueda: txtBusqueda },
		onCompleted: (data) => {
			setHerramientas(data?.getAllHerramientas?.rows);
		},
	});

	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(Validate),
		defaultValues: { descripcion: '' },
	});

	const getUrlImage = (url) => {
		setImage(url);
	};

	return (
		<>
			<Header
				name="paqueteHerramientas"
				title="Paquete de herramientas"
				subtitle="Moduló de paquetes Herramientas"
				handleCreate={() => {}}
				agregar
			/>
			<>
				<div className="hidden sm:block" aria-hidden="true">
					<div className="py-5">
						<div className="border-t border-gray-200" />
					</div>
				</div>

				<div className="mt-5 md:col-span-2 md:mt-0">
					<form>
						<div className="overflow-hidden shadow sm:rounded-md">
							<div className="bg-white px-5 py-5 sm:p-2">
								<div className="grid grid-cols-12 gap-2">
									<div className="col-span-12 lg:col-span-4 md:col-span-12 sm:col-span-12 space-y-3">
										<TextFieldController
											autoFocus
											error={errors.descripcion}
											control={control}
											label="Nombre"
											name="descripcion"
										/>
										<UploadFile getUrl={getUrlImage} />
									</div>
									<div className="col-span-12 lg:col-span-8 md:col-span-12 sm:col-span-12">
										<div className="flex m-1">
											<label
												htmlFor="label-form"
												className="block mt-4 text-sm font-medium text-gray-700"
											>
												Seleccione las herramientas del paquete
											</label>
											<div className="ml-auto">
												<SearchField fullWidth={false} />
											</div>
										</div>

										{LoadingTools && <LinearProgress />}
										<TableContainer component={Paper} sx={{ maxHeight: 340 }}>
											<Table
												sx={{ width: '100%' }}
												stickyHeader
												aria-label="sticky table"
											>
												<TableHead>
													<TableRow>
														<TableCell>NOMBRE</TableCell>
														<TableCell>CLASIFICACIÓN</TableCell>
														<TableCell>CONDICIÓN</TableCell>
														<TableCell>ESTATUS</TableCell>
														<TableCell>ACCIÓN</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{herramientas.map((row) => (
														<TableRow key={row.id}>
															<TableCell>{row.nombre}</TableCell>
															<TableCell>
																{row.clasificacion.descripcion}
															</TableCell>
															<TableCell>
																<EstadoHerramienta value={row.estado} />
															</TableCell>
															<TableCell>
																<Estatus value={row.estatus} />
															</TableCell>
															<TableCell>
																<>
																	<Tooltip
																		title="Agregar"
																		placement="left"
																		arrow
																		onClick={() => {}}
																	>
																		<IconButton>
																			<FcPlus
																				size={20}
																				className="text-green-700"
																			/>
																		</IconButton>
																	</Tooltip>
																</>
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>
									</div>
									<div className="col-span-12 lg:col-span-3 md:col-span-12 sm:col-span-12">
										<label
											htmlFor="label-form"
											className="block mb-2 text-sm font-medium text-gray-700"
										>
											Herramientas Seleccionadas
										</label>
										<Box
											sx={{
												width: '100%',
												height: 400,
												maxWidth: 360,
												bgcolor: 'background.paper',
											}}
										>
											<FixedSizeList
												height={300}
												width={360}
												itemSize={46}
												itemCount={herramientas.length}
												overscanCount={5}
											>
												{renderRow}
											</FixedSizeList>
										</Box>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</>
		</>
	);
};
