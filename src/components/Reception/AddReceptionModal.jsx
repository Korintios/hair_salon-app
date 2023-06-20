"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { PickList } from "primereact/picklist";
import { useEffect, useState } from "react";

export default function AddReceptionModal({isVisible = false, ChangeVisible}) {
	const [source, setSource] = useState([]);
	const [target, setTarget] = useState([]);

	const EXAMPLE_SERVICES = [
		{
			id: "1000",
			name: "Corte de Pelo",
			price: 65,
			category: "Cabello",
		},
		{
			id: "1001",
			name: "Limpieza de Cabello",
			price: 72,
			category: "Cabello",
		},
		{
			id: "1002",
			name: "Tintado de Cabello",
			price: 79,
			category: "Cabello",
		},
	];

	useEffect(() => {
		setSource(EXAMPLE_SERVICES);
	}, []);

	const onChange = (event) => {
		setSource(event.source);
		setTarget(event.target);
	};

	const itemTemplate = (item) => {
		return (
			<div className="flex flex-wrap p-2 align-items-center gap-3">
				<div className="flex-1 flex flex-column gap-2">
					<span className="font-bold">{item.name}</span>
					<div className="flex align-items-center gap-2">
						<i className="pi pi-tag text-sm"></i>
						<span>{item.category}</span>
					</div>
				</div>
				<span className="font-bold text-900">${item.price}</span>
			</div>
		);
	};

	const formik = useFormik({
		initialValues: {
			clientName: "",
			clientCc: "",
			services: [],
		},
		onSubmit: (data) => {
			const Service = {
				clientName: formik.values.clientName,
				clientCc: formik.values.clientCc,
				services: target,
				serviceDate: new Date(),
			};
			console.log(Service);
		},
	});

	const formikValues = formik.values;

	return (
		<Dialog
			header={"Formulario de Servicio"}
			visible={isVisible}
			style={{ width: "60vw" }}
			onHide={() => {ChangeVisible(false)}}
		>
			<form onSubmit={formik.handleSubmit}>
				<div style={{ marginTop: 10 }}>
					<span className="card">
						<div className="flex justify-content-between mb-3 gap-3">
							<div className="flex flex-auto flex-column gap-2">
								<label>Nombre de Cliente</label>
								<InputText
									value={formikValues.clientName}
									onChange={(e) => formik.setFieldValue("clientName", e.target.value)}
								/>
							</div>
							<div className="flex flex-auto flex-column gap-2">
								<label>Identificacion de Cliente</label>
								<InputText
									value={formikValues.clientCc}
									onChange={(e) => formik.setFieldValue("clientCc", e.target.value)}
								/>
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
