import { prisma } from "@src/db";

export default async function handler(req, res) {
	const { id } = req.query;
	try {
		await prisma.reception.update({
			where: {
				receptionId: parseInt(id),
			},
			data: {
				isPaid: true,
			}
		});
        return res.status(200).json({msg: "Reception Paid!"})
	} catch (error) {
		return res.status(400).json({msg: error.message})
	}
}
