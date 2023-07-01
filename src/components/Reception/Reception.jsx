"use client";

import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import AddReceptionModal from "./AddReceptionModal";
import { GetTotalPriceService } from "@src/helpers/PriceHelper";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";

import { useAPI } from "@src/service/useAPI";
import { modalContext } from "@context/modalContextProvider";

export default function Reception() {

	//! Variables of the Component
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [expandedRows, setExpandedRows] = useState(null);
	const [Receptions, setReceptions] = useState([])
	const [Services, setServices] = useState([])
	const { isActiveModal, toggleActiveModal} = useContext(modalContext)

	//! Init Function
	const getData = async() => {
		// eslint-disable-next-line
		useAPI('GET',null,'inventory','get',null, (error,data) => {
			setServices(prevData => data.data)
		})

		// eslint-disable-next-line
		useAPI('GET',null,'reception','get',null, (error,data) => {
			setReceptions(prevData => data.data)
		})
	}

	useEffect(() => {
		getData()
	}, [])

	//! Table Header
	const TableHeader = () => {
		return (
			<div className="flex justify-content-end">
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<InputText
						onChange={(e) => setGlobalFilterValue(e.target.value)}
						placeholder="Buscar Recepciones..."
					/>
				</span>
			</div>
		);
	};

	//! Expanded Table Contain and Functions
	const ExpandedTableFooter = (receptionData) => {
        return (
            <ColumnGroup>
                <Row>
                    <Column footer={"Precio Total: " + GetTotalPriceService(receptionData)} colSpan={3} footerStyle={{ textAlign: "right" }}/>
                </Row>
            </ColumnGroup>
	)};

	const ExpandedTableRowTemplate = (data) => {
		return (
			<div className="p-3">
				<h5 className="mb-3">Servicios de {data.name}</h5>
				<DataTable value={data.services} footerColumnGroup={ExpandedTableFooter(data)}>
					<Column field="serviceName" header="Servicio"></Column>
					<Column field="stylistName" header="Peluquer@/Estilista" />
					<Column field="servicePrice" header="Precio"></Column>
				</DataTable>
			</div>
		);
	};

	const allowExpansion = (rowData) => {
		return rowData.services.length > 0;
	};

	//! Table Status of the Paid
	const TableStatusPaidTemplate = (rowData) => {

		const LABEL_STATUS = rowData.isPaid ? "Pagado" : "En Proceso"
		const SEVERITY_STATUS = rowData.isPaid ? "success" : "info"
		const ICON_STATUS = rowData.isPaid ? "pi pi-check" : "pi pi-info-circle"
		return (
			<div className="flex align-items-center justify-content-center">
				<Tag icon={ICON_STATUS} severity={SEVERITY_STATUS} value={LABEL_STATUS}></Tag>
			</div>
		)
	}

	//! Functions on the Options Table
	function handleDelete(id) {
		// eslint-disable-next-line
		useAPI('DELETE',null,'reception','delete',id, (error,data) => {
			const filteredReceptions = Receptions.filter((reception) => reception.receptionId !== id)
			setReceptions(prevReceptions => filteredReceptions);
		})
	}

	function handlePaid(id) {
		// eslint-disable-next-line
		useAPI('PUT',null,'reception','paid',id,(error,data) => {
			const updateReceptions = Receptions.map((reception) => {
				if (reception.receptionId === id) {
					reception.isPaid = true
				}
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
			</div>
		);
	};

	//! Footer Table
	const paginatorLeft = <Button type="button" icon="pi pi-filter-slash" text />;
	const paginatorRight = <Button type="button" icon="pi pi-refresh" text onClick={() => setReceptions(TableData)}/>;

	return (
		<div>
			<AddReceptionModal
				data={Receptions}
				setData={setReceptions}
				dataServices={Services}
			/>
			<Button
				icon="pi pi-plus"
				severity="success"
				label="Registrar Servicio"
				className="mb-3"
				onClick={() => toggleActiveModal()}
			/>
			<DataTable
				value={Receptions}
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
				<Column field="clientCc" header="Cedula" sortable />
				<Column field="isPaid" header="Estado" sortable body={TableStatusPaidTemplate} style={{ width: "10rem" }}/>
				<Column
					header="Opciones"
					body={TableOptionsTemplate}
					style={{ width: "3rem" }}
				/>
			</DataTable>
		</div>
	);
}
