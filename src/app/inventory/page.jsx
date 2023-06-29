import Inventory from "@src/components/Inventory/Inventory";
import { prisma } from "@src/db";

export default async function index() {

	const DataInventory = await prisma.inventory.findMany()

	return <Inventory dataInventory={DataInventory}/>
}
