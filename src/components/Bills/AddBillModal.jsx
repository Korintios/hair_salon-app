"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { getFormErrorMessage } from '@utils/UtilForm'
import { useAPI } from '@service/useAPI'
import { useContext, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";

export default function AddBillModal({ setItems, isActiveModal, setIsActiveModal, stylistsData }) {

	const formik = useFormik({
		initialValues: {
			stylistName: "",
			billName: "",
			billPrice: "",
		},
		validate: (data) => {
			let errors = {};
			const REQUIRED_MSG = "Este Campo es Obligatorio!";

			if (!data.stylistName) {
				errors.stylistName = REQUIRED_MSG;
			}

			if (!data.billName) {
				errors.billName = REQUIRED_MSG;
			}

			if (!data.billPrice) {
				errors.billPrice = REQUIRED_MSG;
			}

			return errors;
		},
		onSubmit: (dataSubmit) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useAPI('POST', dataSubmit, 'bill', 'create', 0, (error,data) => {
                data.data.billDate = new Date(data.data.billDate)
                setItems(prevData => [...prevData, data.data]);
                formik.resetForm()
                setIsActiveModal(false)
            })
		},
	});

	const formikValues = formik.values;

	return (
		<Dialog
			header={"Formulario de Gasto"}
			visible={isActiveModal}
			style={{ width: "25vw" }}
			onHide={() => setIsActiveModal(false)}
		>
			<form onSubmit={formik.handleSubmit}>
				<div className="mt-10 flex flex-column">
					<span className="card">
                        <div className="flex flex-auto flex-column gap-2">
                            <label>Estilista Encargada</label>
                            <Dropdown value={formikValues.stylistName} options={stylistsData} onChange={(e) => formik.setFieldValue('stylistName', e.target.value)} placeholder="Selecciona una Estilista" />
                            <div>
                                {getFormErrorMessage(formik,'stylistName')}
                            </div>
                        </div>
                        <div className="flex flex-auto flex-column gap-2">
                            <label>Tipo/Nombre del Gasto</label>
							<span className="p-input-icon-left">
								<i className="pi pi-shopping-cart" />
								<InputText
									value={formikValues.billName}
									onChange={(e) => formik.setFieldValue("billName", e.target.value)}
									className="w-full"
								/>
							</span>
                            <div>
                                {getFormErrorMessage(formik,'billPrice')}
                            </div>
                        </div>
                        <div className="flex flex-auto flex-column gap-2">
                            <label>Precio del Gasto</label>
							<span className="p-input-icon-left">
								<i className="pi pi-dollar" />
								<InputText
									value={formikValues.billPrice}
									type="number"
									onChange={(e) => formik.setFieldValue("billPrice", e.target.value)}
									className="w-full"
								/>
							</span>
                            <div>
                                {getFormErrorMessage(formik,'billPrice')}
                            </div>
                        </div>
						<Button
							label={"Registrar Gasto"}
							type="submit"
							className="w-full mt-3"
						/>
					</span>
				</div>
			</form>
		</Dialog>
	);
}
