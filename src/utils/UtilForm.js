export const isFormFieldInvalid = (formik, name) => !!(formik.touched[name] && formik.errors[name]);

export const getFormErrorMessage = (formik, name) => {
	return isFormFieldInvalid(formik, name) ? (
		<small className="p-error">{formik.errors[name]}</small>
	) : (
		<small className="hide p-error"></small>
	);
};