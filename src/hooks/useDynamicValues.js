import { useState, useEffect } from "react";
import { useAPI } from "../service/useAPI";
/**
 *	Ten acceso a tus datos de obtenidos de la api y modificalos con los datos y funciones obtenidos: data, setData, isLoading.
 * 	@param {*} section El tipo de seccion que abarcara la api, en este caso cuenta con dos que seria reception, service y inventory.
 */
export const useDynamicValues = (section) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// eslint-disable-next-line
		useAPI("GET", null, section, "get", null, (error, data) => {
			if (!error) {
				if (section == 'service' || section == 'bill') {
					setData(data.data.map((e) => {
						if (section == 'service') {
							e.serviceDate = new Date(e.serviceDate)
						} else {
							e.billDate = new Date(e.billDate)
						}
						return e;
					}))
				} else {
					setData(data.data);
				}
				setIsLoading(false);
			}
		});
	}, [section]);

	return { data, setData, isLoading };
};
