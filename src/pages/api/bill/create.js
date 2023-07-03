import { prisma } from "@src/db";

export default async function handler(req, res) {
	try {
		if (req.method === "POST") {
			if (req.body.stylistName == undefined) {
				throw new Error("The Stylist Name is Undefined or Null");
			}

			if (req.body.billName == undefined) {
				throw new Error("The Bill Name is Undefined or Null");
			}

			if (req.body.billPrice == undefined) {
				throw new Error("The Bill Price is Undefined or Null");
			}

			const newBill = await prisma.bills.create({
                data: {
					stylistName: req.body.stylistName,
                    billName: req.body.billName,
                    billPrice: parseInt(req.body.billPrice)
				},
            })

			return res.status(202).json({ message: "Create!", data: newBill });
		}

		throw new Error("This method not Allowed");
	} catch (err) {
		return res
			.status(400)
			.json({ message: "Error!", messageError: err.message });
	}
}
