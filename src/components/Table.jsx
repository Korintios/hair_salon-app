import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";

export default function Table({ value }) {
    
	const paginatorLeft = <Button type="button" icon="pi pi-filter-slash" text />;
	const paginatorRight = <Button type="button" icon="pi pi-refresh" text />;

	return (
		<DataTable
			value={value}
			paginator
			rows={25}
			rowsPerPageOptions={[25, 50, 100]}
			paginatorLeft={paginatorLeft}
			paginatorRight={paginatorRight}
			showGridlines
		>

        </DataTable>
	);
}
