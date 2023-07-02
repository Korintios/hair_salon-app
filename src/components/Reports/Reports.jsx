"use client";

import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar"
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

import { formatPrice } from "@src/helpers/PriceHelper";
import { formatDate } from "@helpers/DateHelper"
import { useDynamicValues } from "@hooks/useDynamicValues"

export default function Reports() {

	const {data: reports} = useDynamicValues('service')
	const [Stylists, setStylists] = useState([])
	const [filters, setFilters] = useState({
        stylistName: { value: null, matchMode: FilterMatchMode.EQUALS },
		serviceDate: { value: null, matchMode: FilterMatchMode.DATE_AFTER }
    });
	const [filteredReports, setFilteredReports] = useState([])
	const [totalPaid, setTotalPaid] = useState(formatPrice(0))
	const exportColumns = filteredReports.map((col) => ({ Estilista: col.stylistName, Precio: col.servicePrice, Fecha: col.serviceDate }));

	useEffect(() => {
		if (reports.length != 0) {
			let arrayUniques = new Set()
			reports.forEach((r) => {
				arrayUniques.add(r.stylistName)
			})
			setStylists(Array.from(arrayUniques))
		}
	}, [reports])

	const initFilters = () => {
		setFilters({
			stylistName: { value: null, matchMode: FilterMatchMode.EQUALS },
			serviceDate: { value: null, matchMode: FilterMatchMode.DATE_AFTER }
		})
	}

	const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 3);

				const AtributtesReport = filteredReports.map((item) => {

					const formatDateItem = formatDate(item.serviceDate)

					const {stylistName, servicePrice, serviceDate} = item;

					return [stylistName, servicePrice, formatDateItem]
				})

				doc.text("Reportes",10,10)

				doc.autoTable({
					headerStyles: { fillColor: [230, 0, 126] },
					head: [['Estilista', 'Precio del Servicio', 'Fecha del Servicio']],
					body: AtributtesReport,
					startY: 15
				  })
				
                doc.save('Reports.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(exportColumns);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'Reportes');
        });
    };

	const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

	const TableHeader = () => {
		return (
			<div className="flex justify-content-between">
				<div className="flex gap-2">
					<Button
						type="button"
						icon="pi pi-file-excel"
						severity="success"
						rounded
						onClick={exportExcel}
						data-pr-tooltip="XLS"
					/>
					<Button
						type="button"
						icon="pi pi-file-pdf"
						severity="warning"
						rounded
						onClick={exportPdf}
						data-pr-tooltip="PDF"
					/>
				</div>
			</div>
		);
	};

	const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.serviceDate);
    };

	const getTotalPaid = (data) => {
        let total = 0;

        for (let rep of data) {
            total += rep.servicePrice;
        }

        return setTotalPaid(formatPrice(total));
    };

	const stylistsFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={Stylists} onChange={(e) => options.filterApplyCallback(e.value)} placeholder="Selecciona una Estilista" />;
    };

	const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Total a Pagar:" colSpan={2} footerStyle={{ textAlign: 'right' }} />
                <Column footer={totalPaid} />
            </Row>
        </ColumnGroup>
    );

	const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterApplyCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy"/>;
    };

	const paginatorLeft = <Button type="button" icon="pi pi-filter-slash" text onClick={() => initFilters()}/>;
	const paginatorRight = <Button type="button" icon="pi pi-refresh" text/>;

	return (
		<div>
			<DataTable
				header={TableHeader}
				showGridlines
				filterDisplay="row"
				filters={filters}
				onValueChange={(filteredData) => {
					if (filteredData.length != 0) { getTotalPaid(filteredData) }
					setFilteredReports(prevData => filteredData)
				}}
				value={reports}
				dataKey="serviceId"
				paginator
				rows={10}
				rowsPerPageOptions={[10, 25, 50, 75, 100]}
				footerColumnGroup={footerGroup}
				paginatorLeft={paginatorLeft}
				paginatorRight={paginatorRight}
			>
				<Column field="stylistName" filter filterField="stylistName" filterElement={stylistsFilterTemplate} showFilterMenu={false} sortable header="Peluquer@/Estilista"/>
				<Column field="servicePrice" filterField="servicePrice" sortable header="Precio"/>
				<Column field="serviceDate" filter filterField="serviceDate" filterElement={dateFilterTemplate} sortable header="Fecha del Servicio" dataType="date" body={dateBodyTemplate}/>
			</DataTable>
		</div>
	);
}
