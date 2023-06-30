import { prisma } from "@src/db";

export default async function handler(req, res) {
	const { id } = req.query;
	try {
		const updatedService = await prisma.inventory.update({
			where: {
				itemId: parseInt(id),
			},
            data: {
                itemName: req.body.itemName,
                itemPrice: parseInt(req.body.itemPrice),
                itemTag: req.body.itemTag,
                stylistManager: req.body.stylistManager
            }
		});
        return res.status(200).json({msg: "Update!", data: updatedService})
	} catch (error) {
		return res.status(400).json({msg: error.message})
	}
}
