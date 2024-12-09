"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { PickList } from "primereact/picklist";
import { useContext, useEffect, useState } from "react";

import { getFormErrorMessage } from "@utils/UtilForm";
import { useAPI } from "@src/service/useAPI";
import { modalContext } from "@context/ModalContextProvider";
import { useDynamicValues } from "@hooks/useDynamicValues";

import { itemTemplate } from "@src/components/Reception/Template/ItemTemplate";

export default function AddReceptionModal({ setReceptions }) {
	const [source, setSource] = useState([]);
	const [target, setTarget] = useState([]);
	const { isActiveModal, toggleActiveModal } = useContext(modalContext);
	const { data: inventory } = useDynamicValues("inventory");

	useEffect(() => {
		setSource((prevData) => inventory);
	}, [inventory]);

	const formik = useFormik({
		initialValues: {
			clientName: "",
			clientCc: "",
			services: target,
		},
		validate: (data) => {
			let errors = {};
			const REQUIRED_MSG = "Este Campo es Obligatorio!";
			const REQUIRED_SERVICES = "Debes Seleccionar Minimo un Servicio!";

			if (!data.clientName) {
				errors.clientName = REQUIRED_MSG;
			}

			if (target.length === 0) {
				errors.services = REQUIRED_SERVICES;
			}

			return errors;
		},
		onSubmit: (dataSubmit) => {
			dataSubmit.services = target;
			// eslint-disable-next-line
			useAPI("POST", dataSubmit, "reception", "create", 0, (error, data) => {
				setReceptions((prevData) => [...prevData, data.data]);
				formik.resetForm();
				toggleActiveModal();
			});
		},
	});

	const formikValues = formik.values;

	const onChange = (event) => {
		setSource(event.source);
		setTarget(event.target);
	};

	return (
		<Dialog
			header={"Formulario de Servicio"}
			visible={isActiveModal}
			style={{ width: "60vw" }}
			onHide={() => {
				toggleActiveModal();
			}}
		>
			<form onSubmit={formik.handleSubmit}>
				<div style={{ marginTop: 10 }}>
					<span className="card">
						<div className="flex justify-content-between gap-3">
							<div className="flex flex-auto flex-column gap-2">
								<label>Nombre de Cliente</label>
								<InputText
									value={formikValues.clientName}
									onChange={(e) =>
										formik.setFieldValue("clientName", e.target.value)
									}
								/>
								<div>{getFormErrorMessage(formik, "clientName")}</div>
							</div>
						</div>
						<div className="flex flex-column gap-2 mb-3">
							<h4>Seleccion de Servicios</h4>
							<PickList
								source={source}
								target={target}
								onChange={onChange}
								itemTemplate={itemTemplate}
								filter
								filterBy="itemName"
								breakpoint="1400px"
								sourceHeader="Servicios Disponibles"
								targetHeader="Servicios Seleccionados"
								sourceStyle={{ height: "30rem" }}
								targetStyle={{ height: "30rem" }}
								sourceFilterPlaceholder="Buscar por nombre..."
								targetFilterPlaceholder="Buscar por nombre..."
							/>
							<div>{getFormErrorMessage(formik, "services")}</div>
						</div>
						<Button
							label={"Generar Recepcion"}
							type="submit"
							icon="pi pi-"
							className="w-full"
						/>
					</span>
				</div>
			</form>
		</Dialog>
	);
}
