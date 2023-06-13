'use client'

import { Tag } from 'primereact/tag'
import { Button } from 'primereact/button'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { useState } from 'react';

export default function Inventory() {
    const [products, setProducts] = useState([
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Corte de Cabello',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 18000,
            category: 'Cabello',
            quantity: 24,
            inventoryStatus: 'DISPONIBLE',
            rating: 5
        },
        {
            id: '1001',
            code: 'nvklal433',
            name: 'Limpieza de Cabello',
            description: 'Product Description',
            image: 'black-watch.jpg',
            price: 20000,
            category: 'Cabello',
            quantity: 61,
            inventoryStatus: 'DISPONIBLE',
            rating: 4
        },
        {
            id: '1002',
            code: 'zz21cz3c1',
            name: 'Teñido de Cabello',
            description: 'Product Description',
            image: 'blue-band.jpg',
            price: 180000,
            category: 'Cabello',
            quantity: 2,
            inventoryStatus: 'SIN SERVICIO',
            rating: 3
        },
        {
            id: '1003',
            code: '244wgerg2',
            name: 'Alisamiento de Cabello',
            description: 'Product Description',
            image: 'blue-t-shirt.jpg',
            price: 150000,
            category: 'Cabello',
            quantity: 25,
            inventoryStatus: 'DISPONIBLE',
            rating: 5
        }
    ]);
    const [layout, setLayout] = useState('grid');

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'DISPONIBLE':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const listItem = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-pencil" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">{product.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-pencil" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product);
        else if (layout === 'grid') return gridItem(product);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} />
        </div>
    )
}