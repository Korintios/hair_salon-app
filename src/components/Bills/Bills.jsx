"use client";

import { useContext, useEffect, useState } from "react";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar"
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';

import { formatPrice } from "@src/helpers/PriceHelper";
import { formatDate } from "@helpers/DateHelper"
import { useDynamicValues } from "@hooks/useDynamicValues"
import AddBillModal from "./AddBillModal";
import { useAPI } from "@service/useAPI";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

export default function Bills() {

	const {data: reports} = useDynamicValues('service')
	const {data: bills, setData: setBills} = useDynamicValues('bill')
	const [Stylists, setStylists] = useState([])
	const [filteredBills, setFilteredBills] = useState([])
	const exportColumns = filteredBills.map((col) => ({ 
        "Peluquer@/Estilista": col.stylistName, 
        "Tipo/Nombre de Gasto": col.billName, 
        "Precio": col.billPrice,
        "Fecha de Gasto": col.billDate 
    }));
	const [totalPaid, setTotalPaid] = useState(formatPrice(0))
	const [isActiveModal, setIsActiveModal] = useState(false)


    useEffect(() => {
		if (reports.length != 0) {
			let arrayUniques = new Set()
			reports.forEach((r) => {
				arrayUniques.add(r.stylistName)
			})
			setStylists(Array.from(arrayUniques))
		}
	}, [reports])

    const handleDelete = (id) => {
		// eslint-disable-next-line
		useAPI('DELETE',null,'bill','delete',id, (error,data) => {
            if (!error) {
                const filteredBills = bills.filter((bill) => bill.billId !== id)
                setBills(prevBills => filteredBills);
            }
		})
	}

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
			exportColumns.push({Total: totalPaid})
            const worksheet = xlsx.utils.json_to_sheet(exportColumns);
            const firstColumnWidth = 20;
            const columnWidths = [{ wch: firstColumnWidth }];
            for (let i = 1; i < 4; i++) {
              columnWidths.push({ wch: firstColumnWidth });
            }
            worksheet['!cols'] = columnWidths;
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'Gastos');
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

	const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 3);

				const AtributtesReport = filteredBills.map((item) => {

					const formatDateItem = formatDate(item.billDate)

					const {stylistName, billName, billPrice, billDate} = item;

					return [stylistName, billName, billPrice, formatDateItem]
				})

				doc.text("Gastos",10,10)

				doc.autoTable({
					headerStyles: { fillColor: [230, 0, 126] },
					head: [['Estilista', 'Nombre del Gasto', 'Precio del Gasto', 'Fecha de Gasto']],
					body: AtributtesReport,
					startY: 15
				  })

				doc.text("Total en Gastos: " + totalPaid, 10, doc.internal.pageSize.height - 10)
				
                doc.save('Gastos.pdf');
            });
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
        if (bills.length != 0) {
            return formatDate(rowData.billDate);
        }
    };

	const getTotalPaid = (data) => {
        let total = 0;

        for (let rep of data) {
            total += rep.billPrice;
        }

        return setTotalPaid(formatPrice(total));
    };

	const stylistsFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={Stylists} onChange={(e) => options.filterApplyCallback(e.value)} placeholder="Selecciona una Estilista" />;
    };

	const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterApplyCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy"/>;
    };

    const billPriceTemplate = (rowData) => {
        return <span>{formatPrice(rowData.billPrice)}</span>
    }

    const TableOptionsTemplate = (rowData) => {
        return (
			<div className="flex justify-content-center">
				<div className="flex">
					<Button
						type="button"
						icon="pi pi-trash"
						severity="danger"
                        onClick={() => handleDelete(rowData.billId)}
						rounded
					/>
				</div>
			</div>
		);
    }

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Total a Pagar:" colSpan={3} footerStyle={{ textAlign: 'right' }} />
                <Column footer={totalPaid} colSpan={2}/>
            </Row>
        </ColumnGroup>
    );

	const paginatorLeft = <Button type="button" icon="pi pi-filter-slash" text onClick={() => initFilters()}/>;
	const paginatorRight = <Button type="button" icon="pi pi-refresh" text/>;

	return (
		<div>
            <AddBillModal setItems={setBills} isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} stylistsData={Stylists}/>
            <Button
				icon="pi pi-plus"
				severity="success"
				label="Registrar Gasto"
				className="mb-3"
                onClick={() => setIsActiveModal(true)}
			/>
			<DataTable
				header={TableHeader}
				showGridlines
				filterDisplay="row"
				onValueChange={(filteredData) => {
					if (filteredData.length != 0) { getTotalPaid(filteredData) } else { setTotalPaid(formatPrice(0))}
					setFilteredBills(prevData => filteredData)
				}}
				value={bills}
                footerColumnGroup={footerGroup}
				dataKey="serviceId"
				paginator
				rows={10}
				rowsPerPageOptions={[10, 25, 50, 75, 100]}
				paginatorLeft={paginatorLeft}
				paginatorRight={paginatorRight}
			>
				<Column header="Peluquer@/Estilista" field="stylistName" filter filterField="stylistName" filterElement={stylistsFilterTemplate} showFilterMenu={false} sortable />
				<Column header="Tipo/Nombre de Gasto" field="billName" filterField="servicePrice" sortable />
				<Column header="Precio" field="billPrice" body={billPriceTemplate} sortable/>
				<Column header="Fecha de Gasto" field="billDate" filter filterField="billDate" filterElement={dateFilterTemplate} sortable dataType="date" body={dateBodyTemplate}/>
				<Column header="Opciones" body={TableOptionsTemplate} style={{width: "5em"}}/>
			</DataTable>
		</div>
	);
}
