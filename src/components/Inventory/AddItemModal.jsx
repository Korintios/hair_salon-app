"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { PickList } from "primereact/picklist";
import { useEffect, useState } from "react";

import { getFormErrorMessage } from '@utils/UtilForm'

export default function AddItemModal({isVisible = false, ChangeVisible, data, setData}) {

	const handleSubmit = async (data) => {
		try {
		  const response = await fetch('http://localhost:3000/api/inventory/create', {
			body: JSON.stringify(data),
			headers: {
			  'Content-Type': 'application/json'
			},
			method: 'POST'
		  });
	  
		  if (response.ok) {
			const jsonResponse = await response.json();
			setData(prevData => [...prevData, jsonResponse.data]);
		  } else {
		  }
		} catch (error) {
		  console.log(error);
		}
	  };

	const formik = useFormik({
		initialValues: {
			serviceName: "",
			servicePrice: "",
			serviceTag: ""
		},
		validate: (data) => {
			let errors = {};
			const REQUIRED_MSG = "Este Campo es Obligatorio!";

			if (!data.serviceName) {
				errors.serviceName = REQUIRED_MSG;
			}

			if (!data.servicePrice) {
				errors.servicePrice = REQUIRED_MSG;
			}

			if (!data.serviceTag) {
				errors.serviceTag = REQUIRED_MSG;
			}

			return errors;
		},
		onSubmit: (data) => {
			const Item = {
				itemName: formik.values.serviceName,
				itemPrice: formik.values.servicePrice,
				itemTag: formik.values.serviceTag
			};

			handleSubmit(Item)
			formik.resetForm()
			ChangeVisible(false)
		},
	});

	const formikValues = formik.values;

	return (
		<Dialog
			header={"Formulario de Servicio"}
			visible={isVisible}
			style={{ width: "25vw" }}
			onHide={() => {ChangeVisible(false)}}
		>
			<form onSubmit={formik.handleSubmit}>
				<div className="mt-10 flex flex-column">
					<span className="card">
                        <div className="flex flex-auto flex-column gap-2">
                            <label>Nombre del Servicio</label>
                            <InputText
                                value={formikValues.serviceName}
                                onChange={(e) => formik.setFieldValue("serviceName", e.target.value)}
                            />
                            <div>
                                {getFormErrorMessage(formik,'serviceName')}
                            </div>
                        </div>
                        <div className="flex flex-auto flex-column gap-2">
                            <label>Precio del Servicio</label>
							<span className="p-input-icon-left">
								<i className="pi pi-dollar" />
								<InputText
									value={formikValues.servicePrice}
									type="number"
									onChange={(e) => formik.setFieldValue("servicePrice", e.target.value)}
									className="w-full"
								/>
							</span>
                            <div>
                                {getFormErrorMessage(formik,'servicePrice')}
                            </div>
                        </div>
                        <div className="flex flex-auto flex-column gap-2">
                            <label>Categoria del Servicio</label>
							<span className="p-input-icon-left">
								<i className="pi pi-tag" />
								<InputText
									value={formikValues.serviceTag}
									onChange={(e) => formik.setFieldValue("serviceTag", e.target.value)}
									className="w-full"
								/>
							</span>
                            <div>
                                {getFormErrorMessage(formik,'serviceTag')}
                            </div>
                        </div>
						<Button
							label={"Registrar Servicio"}
							type="submit"
							className="w-full mt-3"
						/>
					</span>
				</div>
			</form>
		</Dialog>
	);
}
