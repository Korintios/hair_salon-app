import Reception from "@src/components/Reception/Reception";
import { prisma } from "@src/db";

export default async function page() {

    const receptionsData = await prisma.reception.findMany({
            include: {
                services: true
            }
        })
    
    const dataInventory = await prisma.inventory.findMany()

    return (
        <>
            <Reception TableData={receptionsData} dataInventory={dataInventory} />
        </>
    );
}