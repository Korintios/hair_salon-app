'use client'

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useState } from 'react';
export default function Reception() {

    const EXAMPLE_VALUES = [
        {
            name: "Jose Suarez",
            cc: 123456789,
            servicios: [
                {
                    id: 1,
                    name: "Corte de Cabello",
                    precio: 15000
                },
                {
                    id: 2,
                    name: "Limpieza de Cabello",
                    precio: 20000
                },
                {
                    id: 3,
                    name: "Pintura de Cabello",
                    precio: 180000
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

    const ExpandedTableRowTemplate = (data) => {
        return (
            <div className="p-3">
                <h5 className='mb-3'>Servicios de {data.name}</h5>
                <DataTable value={data.servicios}>
                    <Column field="name" header="Servicio"></Column>
                    <Column field="precio" header="Precio"></Column>
                </DataTable>
            </div>
        );
    };

    const allowExpansion = (rowData) => {
        return rowData.servicios.length > 0;
    };

    return (
        <div>
            <DataTable value={EXAMPLE_VALUES} header={TableHeader} paginator rows={25} rowsPerPageOptions={[25, 50, 100]} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={ExpandedTableRowTemplate} showGridlines>
                <Column expander={allowExpansion} style={{ width: '3rem' }} />
                <Column field='name' header='Nombre Completo' sortable/>
                <Column field='cc' header='Cedula' sortable/>
            </DataTable>
        </div>
    );
}