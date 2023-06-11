import React from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import Image from 'next/image';

export function Inventory() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts([
            {
                name: "test"
            }
        ])
    }, [])

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const itemTemplate = (product) => {
        return (
            <div className="col-12">
                <h1>{product.name}</h1>
            </div>
        );
    };

    return (
        <div className="card">

        </div>
    )
}