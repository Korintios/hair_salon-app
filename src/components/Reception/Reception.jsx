'use client'

import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup'
import { Row } from 'primereact/row'
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useState } from 'react';
export default function Reception() {

    const EXAMPLE_VALUES = [
        {
            name: "Jose Suarez",
            cc: 123456789,
            services: [
                {
                    id: 1,
                    name: "Corte de Cabello",
                    price: 15000
                },
                {
                    id: 2,
                    name: "Limpieza de Cabello",
                    price: 20000
                },
                {
                    id: 3,
                    name: "Pintura de Cabello",
                    price: 180000
                }
            ]
        }
    ]

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [expandedRows, setExpandedRows] = useState(null);

    const TableHeader = (
        <div className="flex justify-content-between">
            <div className='flex gap-2'>
                <Button type="button" icon="pi pi-file" rounded onClick={null} data-pr-tooltip="CSV" />
                <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={null} data-pr-tooltip="XLS" />
                <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={null} data-pr-tooltip="PDF" />
            </div>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={null} placeholder="Buscar Recepciones..." />
            </span>
        </div>
    )

    const paginatorLeft = <Button type="button" icon="pi pi-filter-slash" text />;
    const paginatorRight = <Button type="button" icon="pi pi-refresh" text />;

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const GetTotalPriceService = () => {
        let total = 0

        EXAMPLE_VALUES[0].services.forEach((s) => {
            total += s.price
        })

        return formatCurrency(total)
    }

    const ExpandedTableFooter = (
        <ColumnGroup>
            <Row>
                <Column footer={"Precio Total: " + GetTotalPriceService()} colSpan={2} footerStyle={{ textAlign: 'right' }} />
            </Row>
        </ColumnGroup>
    );

    const ExpandedTableRowTemplate = (data) => {
        return (
            <div className="p-3">
                <h5 className='mb-3'>Servicios de {data.name}</h5>
                <DataTable value={data.services} footerColumnGroup={ExpandedTableFooter}>
                    <Column field="name" header="Servicio"></Column>
                    <Column field="price" header="Precio"></Column>
                </DataTable>
            </div>
        );
    };

    const allowExpansion = (rowData) => {
        return rowData.services.length > 0;
    };

    return (
        <div>
            <DataTable value={EXAMPLE_VALUES} header={TableHeader} paginator rows={25} rowsPerPageOptions={[25, 50, 100]} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={ExpandedTableRowTemplate} paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} showGridlines>
                <Column expander={allowExpansion} style={{ width: '3rem' }} />
                <Column field='name' header='Nombre Completo' sortable/>
                <Column field='cc' header='Cedula' sortable/>
            </DataTable>
        </div>
    );
}