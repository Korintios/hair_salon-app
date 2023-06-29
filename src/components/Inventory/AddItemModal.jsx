"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { getFormErrorMessage } from '@utils/UtilForm'
import { useAPI } from '@service/useAPI'

export default function AddItemModal({isVisible = false, ChangeVisible, data, setData}) {

	const formik = useFormik({
		initialValues: {
			itemName: "",
			itemPrice: "",
			itemTag: "",
			stylistManager: ""
		},
		validate: (data) => {
			let errors = {};
			const REQUIRED_MSG = "Este Campo es Obligatorio!";

			if (!data.itemName) {
				errors.itemName = REQUIRED_MSG;
			}

			if (!data.itemPrice) {
				errors.itemPrice = REQUIRED_MSG;
			}

			if (!data.itemTag) {
				errors.itemTag = REQUIRED_MSG;
			}

			if (!data.stylistManager) {
				errors.stylistManager = REQUIRED_MSG;
			}

			return errors;
		},
		onSubmit: (dataSubmit) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useAPI('POST', dataSubmit, 'inventory', 'create', 0, (error,data) => {
				setData(prevData => [...prevData, data.data]);
				formik.resetForm()
				ChangeVisible(false)
			})
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
                                value={formikValues.itemName}
                                onChange={(e) => formik.setFieldValue("itemName", e.target.value)}
                            />
                            <div>
                                {getFormErrorMessage(formik,'itemName')}
                            </div>
                        </div>
                        <div className="flex flex-auto flex-column gap-2">
                            <label>Precio del Servicio</label>
							<span className="p-input-icon-left">
								<i className="pi pi-dollar" />
								<InputText
									value={formikValues.itemPrice}
									type="number"
									onChange={(e) => formik.setFieldValue("itemPrice", e.target.value)}
									className="w-full"
								/>
							</span>
                            <div>
                                {getFormErrorMessage(formik,'itemPrice')}
                            </div>
                        </div>
                        <div className="flex flex-auto flex-column gap-2">
                            <label>Categoria del Servicio</label>
							<span className="p-input-icon-left">
								<i className="pi pi-tag" />
								<InputText
									value={formikValues.itemTag}
									onChange={(e) => formik.setFieldValue("itemTag", e.target.value)}
									className="w-full"
								/>
							</span>
                            <div>
                                {getFormErrorMessage(formik,'itemTag')}
                            </div>
                        </div>
						<div className="flex flex-auto flex-column gap-2">
                            <label>Estilista Encargada</label>
							<span className="p-input-icon-left">
								<i className="pi pi-user" />
								<InputText
									value={formikValues.stylistManager}
									onChange={(e) => formik.setFieldValue("stylistManager", e.target.value)}
									className="w-full"
								/>
							</span>
                            <div>
                                {getFormErrorMessage(formik,'stylistManager')}
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
