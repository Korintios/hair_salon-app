import { prisma } from "@src/db";

export default async function handler(req, res) {
	const { id } = req.query;
	try {
		await prisma.reception.delete({
			where: {
				receptionId: parseInt(id),
			},
		});
        return res.status(200).json({msg: "Delete!"})
	} catch (error) {
		return res.status(400).json({msg: error.message})
	}
}
