"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { getFormErrorMessage } from "@utils/UtilForm";
import { useAPI } from "@service/useAPI";
import { useContext, useEffect } from "react";
import { modalContext } from "@context/ModalContextProvider";

export default function AddItemModal({
	setItems,
	isUpdate,
	setIsUpdate,
	dataUpdate,
}) {
	const { isActiveModal, toggleActiveModal } = useContext(modalContext);

	const formik = useFormik({
		initialValues: {
			itemName: "",
			itemPrice: "",
			itemTag: "",
			stylistManager: "",
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
			if (isUpdate) {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useAPI(
					"PUT",
					dataSubmit,
					"inventory",
					"update",
					dataUpdate.itemId,
					(error, data) => {
						setItems((prevData) =>
							prevData.map((d) => {
								if (d.itemId === dataUpdate.itemId) {
									return {
										...d,
										itemName: data.data.itemName,
										itemPrice: data.data.itemPrice,
										itemTag: data.data.itemTag,
										stylistManager: data.data.stylistManager,
									};
								}
								return d;
							})
						);
						formik.resetForm();
						toggleActiveModal();
						setIsUpdate(false);
					}
				);
			} else {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useAPI("POST", dataSubmit, "inventory", "create", 0, (error, data) => {
					setItems((prevData) => [...prevData, data.data]);
					formik.resetForm();
					toggleActiveModal();
				});
			}
		},
	});

	const formikValues = formik.values;

	useEffect(() => {
		if (isUpdate) {
			formik.setFieldValue("itemName", dataUpdate.itemName);
			formik.setFieldValue("itemPrice", dataUpdate.itemPrice);
			formik.setFieldValue("itemTag", dataUpdate.itemTag);
			formik.setFieldValue("stylistManager", dataUpdate.stylistManager);
		} else {
			formik.resetForm();
			setIsUpdate(false);
		}
	}, [dataUpdate]);

	return (
		<Dialog
			header={isUpdate ? "Actualizar Servicio" : "Formulario de Servicio"}
			visible={isActiveModal}
			style={{ width: "25vw" }}
			onHide={() => toggleActiveModal()}
		>
			<form onSubmit={formik.handleSubmit}>
				<div className="mt-10 flex flex-column">
					<span className="card">
						<div className="flex flex-auto flex-column gap-2">
							<label>Nombre del Servicio</label>
							<InputText
								value={formikValues.itemName}
								onChange={(e) =>
									formik.setFieldValue("itemName", e.target.value)
								}
							/>
							<div>{getFormErrorMessage(formik, "itemName")}</div>
						</div>
						<div className="flex flex-auto flex-column gap-2">
							<label>Precio del Servicio</label>
							<span className="p-input-icon-left">
								<i className="pi pi-dollar" />
								<InputText
									value={formikValues.itemPrice}
									type="number"
									onChange={(e) =>
										formik.setFieldValue("itemPrice", e.target.value)
									}
									className="w-full"
								/>
							</span>
							<div>{getFormErrorMessage(formik, "itemPrice")}</div>
						</div>
						<div className="flex flex-auto flex-column gap-2">
							<label>Categoria del Servicio</label>
							<span className="p-input-icon-left">
								<i className="pi pi-tag" />
								<InputText
									value={formikValues.itemTag}
									onChange={(e) =>
										formik.setFieldValue("itemTag", e.target.value)
									}
									className="w-full"
								/>
							</span>
							<div>{getFormErrorMessage(formik, "itemTag")}</div>
						</div>
						<div className="flex flex-auto flex-column gap-2">
							<label>Estilista Encargada</label>
							<span className="p-input-icon-left">
								<i className="pi pi-user" />
								<InputText
									value={formikValues.stylistManager}
									onChange={(e) =>
										formik.setFieldValue("stylistManager", e.target.value)
									}
									className="w-full"
								/>
							</span>
							<div>{getFormErrorMessage(formik, "stylistManager")}</div>
						</div>
						<Button
							label={isUpdate ? "Actualizar Servicio" : "Registrar Servicio"}
							type="submit"
							className="w-full mt-3"
						/>
					</span>
				</div>
			</form>
		</Dialog>
	);
}
