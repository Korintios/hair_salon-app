"use client";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { TableHeader } from "../TableHeader";

export default function Reports({ ReportsData }) {

	const [Reports, setReports] = useState([])

	useEffect(() => {
		setReports(ReportsData)
	}, [])

	const paginatorLeft = <Button type="button" icon="pi pi-filter-slash" text />;
	const paginatorRight = <Button type="button" icon="pi pi-refresh" text onClick={() => setReceptions(TableData)}/>;

	return (
		<div>
			<DataTable
				value={Reports}
				header={TableHeader(true, globalFilterValue)}
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
				<Column
					header="Opciones"
					body={TableOptionsTemplate}
					style={{ width: "3rem" }}
				/>
			</DataTable>
		</div>
	);
}
