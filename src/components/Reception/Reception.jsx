"use client";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useContext, useState } from "react";
import AddReceptionModal from "./AddReceptionModal";
import { InputText } from "primereact/inputtext";

import { useAPI } from "@src/service/useAPI";
import { useDynamicValues } from "@hooks/useDynamicValues"
import { modalContext } from "@context/modalContextProvider";

import { ExpandedTableRowTemplate } from "@src/components/Reception/Template/ExpandedTableRowTemplate"
import { TableStatusPaidTemplate } from "@src/components/Reception/Template/TableStatusPaidTemplate"
import { formatDate } from "@helpers/DateHelper";
import { formatPrice } from "@helpers/PriceHelper";


export default function Reception() {

	//! Variables of the Component
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [expandedRows, setExpandedRows] = useState(null);
	const { toggleActiveModal } = useContext(modalContext)
	const { data: receptions, setData: setReceptions } = useDynamicValues('reception')
	const dateToday = new Date
	const todayReceptions = receptions.filter((r) => formatDate(new Date(r.dateCreated)) == formatDate(dateToday))
	console.log(receptions)
	console.log(todayReceptions)
	const [isAll, setIsAll] = useState(false)
	let shift = 0

	// PDF
	const exportPdf = (data) => {

        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
				let totalPaid = 0
                const doc = new jsPDF.default(0, 3);
				const AtributtesServices =  data.services.map((s) => {
					const {serviceName, stylistName, servicePrice} = s;
					totalPaid += s.servicePrice
					return [serviceName, stylistName, servicePrice]
				})
			
				doc.setFontSize(12);
				doc.text(`Factura de ${data.clientName}`,10,10)
				doc.text("Total a Pagar: " + formatPrice(totalPaid), 10, 15)

				doc.setFontSize(10); 
				doc.text(`Turno: ${data.shift}`, 10, 20)
				doc.text('Fecha:' + formatDate(new Date(data.dateCreated)), 10, 25)

				let position = 35

				data.services.forEach((service) => {
					console.log(service)
					doc.text(`Servicio: ${service.serviceName}`, 10, position)
					position += 5
					doc.text(`Estilista: ${service.stylistName}`, 10, position)
					position += 5
					doc.text(`Precio: ${service.servicePrice}`, 10, position)
					position += 10
				})

                doc.save('Factura.pdf');
            });
        });
    };

	//! Table Header
	const TableHeader = () => {
		return (
			<div className="flex justify-content-between">
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<InputText
						onChange={(e) => setGlobalFilterValue(e.target.value)}
						placeholder="Buscar Recepciones..."
					/>
				</span>
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<Button label={isAll ? "Visualizar Recepciones Actuales" : "Visualizar Todas las Recepciones"} icon={"pi pi-desktop"} onClick={() => setIsAll((prevData) => !prevData)}/>
				</span>
			</div>
		);
	};

	const allowExpansion = (rowData) => {
		return rowData.services.length > 0;
	};

	//! Functions on the Options Table
	const handleDelete = (id) => {
		// eslint-disable-next-line
		useAPI('DELETE',null,'reception','delete',id, (error,data) => {
			const filteredReceptions = receptions.filter((reception) => reception.receptionId !== id)
			setReceptions(prevReceptions => filteredReceptions);
		})
	}

	const handlePaid = (id) => {
		// eslint-disable-next-line
		useAPI('PUT',null,'reception','paid',id,(error,data) => {
			const updateReceptions = receptions.map((reception) => {
				if (reception.receptionId === id) { reception.isPaid = true }
				return reception
			})
			setReceptions(prevReceptions => updateReceptions);
		})
	}

	//! Table Buttons and Options
	const TableOptionsTemplate = (rowData) => {
		return (
			<div className="flex gap-2">
				<Button icon="pi pi-times" rounded severity="danger" onClick={() => handleDelete(rowData.receptionId)}/>
				<Button icon="pi pi-dollar" rounded severity="success" onClick={() => handlePaid(rowData.receptionId)}/>
				<Button
					type="button"
					icon="pi pi-file-pdf"
					severity="warning"
					rounded
					onClick={() => exportPdf(rowData)}
					data-pr-tooltip="PDF"
				/>
			</div>
		);
	};

	const TableShiftTemplate = (rowData) => {
		shift++
		rowData.shift = shift
		return (
			<div>
				<span>{shift}</span>
			</div>
		)
	}

	//! Footer Table
	const paginatorLeft = <Button type="button" icon="pi pi-filter-slash" text />;
	const paginatorRight = <Button type="button" icon="pi pi-refresh" text/>;

	return (
		<div>
			<AddReceptionModal setReceptions={setReceptions} />
			<Button
				icon="pi pi-plus"
				severity="success"
				label="Registrar Servicio"
				className="mb-3"
				onClick={() => toggleActiveModal()}
			/>
			<DataTable
				value={isAll ? receptions : todayReceptions}
				globalFilter={globalFilterValue}
				header={TableHeader(false, globalFilterValue, () => setGlobalFilterValue())}
				paginator
				rows={10}
				rowsPerPageOptions={[10, 25, 50, 75, 100]}
				expandedRows={expandedRows}
				onRowToggle={(e) => setExpandedRows(e.data)}
				rowExpansionTemplate={ExpandedTableRowTemplate}
				paginatorLeft={paginatorLeft}
				paginatorRight={paginatorRight}
				showGridlines
			>
				<Column expander={allowExpansion} style={{ width: "3rem" }} />
				<Column field="clientName" header="Nombre Completo" sortable />
				<Column header="Turno" body={TableShiftTemplate} sortable />
				<Column field="isPaid" header="Estado" sortable body={TableStatusPaidTemplate} style={{ width: "10rem" }}/>
				<Column header="Opciones" body={TableOptionsTemplate} style={{ width: "3rem" }} />
			</DataTable>
		</div>
	);
}
