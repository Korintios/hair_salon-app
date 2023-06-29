import Reports from "@src/components/Reports/Reports";
import { prisma } from "@src/db";

export default async function page() {

    const reportsData = await prisma.service.findMany()

    return (
        <>
            <h1 className="mb-3">Reportes</h1>
            <Reports ReportsData={reportsData}/>
        </>
    );
}