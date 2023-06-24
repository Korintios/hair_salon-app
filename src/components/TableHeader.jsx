import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export const TableHeader = ({ containExport = false, globalFilterValue, setGlobalFilterValue }) => {
	return (
		<div className="flex justify-content-between">
			{containExport && (
				<div className="flex gap-2">
					<Button
						type="button"
						icon="pi pi-file-excel"
						severity="success"
						rounded
						onClick={null}
						data-pr-tooltip="XLS"
					/>
					<Button
						type="button"
						icon="pi pi-file-pdf"
						severity="warning"
						rounded
						onClick={null}
						data-pr-tooltip="PDF"
					/>
				</div>
			)}
			<span className="p-input-icon-left">
				<i className="pi pi-search" />
				<InputText
					value={globalFilterValue}
					onChange={(e) => setGlobalFilterValue(e.target.value)}
					placeholder="Buscar Recepciones..."
				/>
			</span>
		</div>
	);
};
