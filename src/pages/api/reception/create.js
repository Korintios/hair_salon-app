import { prisma } from "@src/db";
import { NextResponse } from "next/server";

export default async function handler(req, res) {

	let servicesList = []

	try {
		if (req.method === "POST") {

			if (req.body.clientName == undefined) {
				throw new Error("The Client Name is Undefined or Null")
			}

			if (req.body.clientCc == undefined) {
				throw new Error("The Client CC is Undefined or Null")
			}

			const newReception = await prisma.reception.create({
				data: {
					clientName: req.body.clientName,
					clientCc: req.body.clientCc,
				},
			});

			for (const service of req.body.services) {
				const newService = await prisma.service.create({
				  data: {
					receptionId: newReception.receptionId,
					serviceName: service.itemName,
					servicePrice: service.itemPrice,
					stylistName: service.stylistManager,
				  },
				});
		  
				servicesList.push(newService)
			}

			newReception.services = servicesList

			return res.status(202).json({ message: "Create!", data: newReception})
		}

		throw new Error("This method not Allowed")

	} catch (err) {
		return res.status(400).json({ message: "Error!", messageError: err.message });
	}
}