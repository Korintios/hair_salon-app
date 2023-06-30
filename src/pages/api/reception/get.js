import { prisma } from "@src/db";

export default async function handler(req, res) {
	try {
		const receptions = await prisma.reception.findMany({
			include: {
				services: true
			}
		});
		return res.status(202).json({ message: "Get!", data: receptions });
	} catch (err) {
		return res.status(400).json({ message: "Error!", messageError: err.message });
	}
}
