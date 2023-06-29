'use client'

import { Tag } from 'primereact/tag'
import { Button } from 'primereact/button'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { useState } from 'react';

import AddItemModal from '@src/components/Inventory/AddItemModal'

export default function Inventory({ dataInventory }) {

    const [services, setServices] = useState(dataInventory)
    const [isActiveModal, setIsActiveModal] = useState(false)

    //! Functions on the Options Table
	async function handleDelete(id) {
		try {
			await fetch('http://localhost:3000/api/inventory/delete/'+id, {
			  method: 'DELETE'
			}).then((res) => {
				const filteredInventory = services.filter((inv) => inv.itemId !== id)
				setServices(prevServices => filteredInventory)
			}).catch((err) => {
				console.log(err)
			})
		  } catch (error) {
			console.log(error);
			// Manejar el error según tus necesidades
		}
	}

	async function handlePaid(id) {
		try {
			await fetch('http://localhost:3000/api/reception/paid/'+id, {
			  method: 'PUT'
			}).then((res) => {
				console.log(res)
				const updateReceptions = Receptions.map((reception) => {
					if (reception.receptionId === id) {
						reception.isPaid = true
					}
					return reception
				})
				setReceptions(prevReceptions => updateReceptions);
			}).catch((err) => {
				console.log(err)
			})
		  } catch (error) {
			console.log(error);
			// Manejar el error según tus necesidades
		}
	}

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
                                <Button icon="pi pi-trash" className="p-button-rounded" severity='danger' onClick={() => handleDelete(product.itemId)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <AddItemModal isVisible={isActiveModal} ChangeVisible={setIsActiveModal} setData={setServices}/>
            <Button icon="pi pi-plus" label='Agregar Servicio' severity='success' onClick={() => setIsActiveModal(true)}></Button>
            <DataView value={services} itemTemplate={itemTemplate}/>
        </div>
    )
}