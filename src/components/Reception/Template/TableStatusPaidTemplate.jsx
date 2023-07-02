import { Tag } from "primereact/tag";

export const TableStatusPaidTemplate = (rowData) => {
	const LABEL_STATUS = rowData.isPaid ? "Pagado" : "En Proceso";
	const SEVERITY_STATUS = rowData.isPaid ? "success" : "info";
	const ICON_STATUS = rowData.isPaid ? "pi pi-check" : "pi pi-info-circle";
	return (
		<div className="flex align-items-center justify-content-center">
			<Tag
				icon={ICON_STATUS}
				severity={SEVERITY_STATUS}
				value={LABEL_STATUS}
			></Tag>
		</div>
	);
};
