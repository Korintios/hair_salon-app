export const itemTemplate = (item) => {
    return (
        <div className="flex flex-wrap p-2 align-items-center gap-3">
            <div className="flex-1 flex flex-column gap-2">
                <span className="font-bold">{item.itemName}</span>
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-user text-sm"></i>
                    <span>{item.stylistManager}</span>
                </div>
            </div>
            <span className="font-bold text-900">${item.itemPrice}</span>
        </div>
    );
};