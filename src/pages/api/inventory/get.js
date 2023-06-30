import { prisma } from "@src/db";

export default async function handler(req, res) {
	try {
		const items = await prisma.inventory.findMany();
		return res.status(202).json({ message: "Get!", data: items });
	} catch (err) {
		return res
			.status(400)
			.json({ message: "Error!", messageError: err.message });
	}
}
