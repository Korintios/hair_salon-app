"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { PickList } from "primereact/picklist";
import { useContext, useEffect, useState } from "react";

import { getFormErrorMessage } from '@utils/UtilForm'
import { useAPI } from "@src/service/useAPI";
import { modalContext } from "@context/modalContextProvider";

export default function AddReceptionModal({setData, dataServices}) {

	const [source, setSource] = useState([]);
	const [target, setTarget] = useState([]);

	const { isActiveModal, toggleActiveModal} = useContext(modalContext)

	useEffect(() => {
		setSource(prevData => dataServices)
	}, [dataServices])

	const formik = useFormik({
		initialValues: {
			clientName: "",
			clientCc: "",
			services: target
		},
		validate: (data) => {
			let errors = {};
			const REQUIRED_MSG = "Este Campo es Obligatorio!";
			const REQUIRED_SERVICES = "Debes Seleccionar Minimo un Servicio!"

			if (!data.clientName) {
				errors.clientName = REQUIRED_MSG;
			}

			if (!data.clientCc) {
				errors.clientCc = REQUIRED_MSG;
			}

			if (target.length === 0) {
				errors.services = REQUIRED_SERVICES
			}

			return errors;
		},
		onSubmit: (dataSubmit) => {
			dataSubmit.services = target
			// eslint-disable-next-line 
			useAPI('POST',dataSubmit,'reception','create',0, (error,data) => {
				setData(prevData => [...prevData, data.data])
				formik.resetForm()
				toggleActiveModal()
			})
		},
	});

	const formikValues = formik.values;

	const onChange = (event) => {
		setSource(event.source);
		setTarget(event.target);
	};

	const itemTemplate = (item) => {
		return (
			<div className="flex flex-wrap p-2 align-items-center gap-3">
				<div className="flex-1 flex flex-column gap-2">
					<span className="font-bold">{item.itemName}</span>
					<div className="flex align-items-center gap-2">
						<i className="pi pi-tag text-sm"></i>
						<span>{item.itemTag}</span>
					</div>
				</div>
				<span className="font-bold text-900">${item.itemPrice}</span>
			</div>
		);
	};

	return (
		<Dialog
			header={"Formulario de Servicio"}
			visible={isActiveModal}
			style={{ width: "60vw" }}
			onHide={() => {toggleActiveModal()}}
		>
			<form onSubmit={formik.handleSubmit}>
				<div style={{ marginTop: 10 }}>
					<span className="card">
						<div className="flex justify-content-between gap-3">
							<div className="flex flex-auto flex-column gap-2">
								<label>Nombre de Cliente</label>
								<InputText
									value={formikValues.clientName}
									onChange={(e) => formik.setFieldValue("clientName", e.target.value)}
								/>
								<div>
									{getFormErrorMessage(formik,'clientName')}
								</div>
							</div>
							<div className="flex flex-auto flex-column gap-2">
								<label>Identificacion de Cliente</label>
								<InputText
									value={formikValues.clientCc}
									onChange={(e) => formik.setFieldValue("clientCc", e.target.value)}
								/>
								<div>
									{getFormErrorMessage(formik,'clientCc')}
								</div>
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
								filterBy="name"
								breakpoint="1400px"
								sourceHeader="Servicios Disponibles"
								targetHeader="Servicios Seleccionados"
								sourceStyle={{ height: "30rem" }}
								targetStyle={{ height: "30rem" }}
								sourceFilterPlaceholder="Buscar por nombre..."
								targetFilterPlaceholder="Buscar por nombre..."
							/>
							<div>
								{getFormErrorMessage(formik,'services')}
							</div>
						</div>
						<Button
							label={"Generar Recepcion"}
							type="submit"
							icon="pi pi-"
							style={{ width: "100%" }}
						/>
					</span>
				</div>
			</form>
		</Dialog>
	);
}
