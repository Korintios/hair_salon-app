import { useState, useEffect } from "react";
import { useAPI } from "../service/useAPI";
/**
 *
 * @param {*} section El tipo de seccion que abarcara la api, en este caso cuenta con dos que seria reception, reports y inventory.
 */
export const useDynamicValues = (section) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// eslint-disable-next-line
		useAPI("GET", null, section, "get", null, (error, data) => {
			if (!error) {
				setData(data.data);
				setIsLoading(false);
			}
		});
	}, [section]);

	return { data, setData, isLoading };
};
