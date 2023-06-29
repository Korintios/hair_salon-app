'use client'

import { Tag } from 'primereact/tag'
import { Button } from 'primereact/button'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { useState } from 'react';

import AddItemModal from '@src/components/Inventory/AddItemModal'

export default function Inventory({ dataInventory }) {

    const [products, setProducts] = useState(dataInventory)
    const [isActiveModal, setIsActiveModal] = useState(false)

    const DataHeader = () => {
        return (
            <div className="flex justify-content-start">
                <Button icon="pi pi-plus" label='Agregar Servicio' severity='success' onClick={() => setIsActiveModal(true)}></Button>
            </div>
        );
    };

    const itemTemplate = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.itemName}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.itemTag}</span>
                                </span>
                                <Tag 
                                    value={product.isActive ? 'Disponible' : 'Sin Servicio'} 
                                    severity={product.isActive ? 'success' : 'danger'}
                                ></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.itemPrice}</span>
                            <div className="flex gap-2">
                                <Button icon="pi pi-pencil" className="p-button-rounded" />
                                <Button icon="pi pi-trash" className="p-button-rounded" severity='danger'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <AddItemModal isVisible={isActiveModal} ChangeVisible={setIsActiveModal} setData={setProducts}/>
            <DataView value={products} itemTemplate={itemTemplate} header={DataHeader()}/>
        </div>
    )
}