import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

import { GetTotalPriceService } from "@src/helpers/PriceHelper";


//! Expanded Table Contain and Functions
const ExpandedTableFooter = (receptionData) => {
    return (
        <ColumnGroup>
            <Row>
                <Column footer={"Precio Total: " + GetTotalPriceService(receptionData)} colSpan={3} footerStyle={{ textAlign: "right" }}/>
            </Row>
        </ColumnGroup>
)};

export const ExpandedTableRowTemplate = (data) => {
	return (
		<div className="p-3">
			<h5 className="mb-3">Servicios de {data.name}</h5>
			<DataTable
				value={data.services}
				footerColumnGroup={ExpandedTableFooter(data)}
			>
				<Column field="serviceName" header="Servicio"></Column>
				<Column field="stylistName" header="Peluquer@/Estilista" />
				<Column field="servicePrice" header="Precio"></Column>
			</DataTable>
		</div>
	);
};
