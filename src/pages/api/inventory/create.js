import { prisma } from "@src/db";

export default async function handler(req, res) {
	try {
		if (req.method === "POST") {
			if (req.body.itemName == undefined) {
				throw new Error("The Item Name is Undefined or Null");
			}

			if (req.body.itemPrice == undefined) {
				throw new Error("The Item Price is Undefined or Null");
			}

			if (req.body.itemTag == undefined) {
				throw new Error("The Item Tag is Undefined or Null");
			}

			if (req.body.stylistManager == undefined) {
				throw new Error("The Stylist Manager is Undefined or Null");
			}

			const newItem = await prisma.inventory.create({
                data: {
					itemName: req.body.itemName,
					itemPrice: parseInt(req.body.itemPrice),
					itemTag: req.body.itemTag,
					stylistManager: req.body.stylistManager
				},
            })

			return res.status(202).json({ message: "Create!", data: newItem });
		}

		throw new Error("This method not Allowed");
	} catch (err) {
		return res
			.status(400)
			.json({ message: "Error!", messageError: err.message });
	}
}
