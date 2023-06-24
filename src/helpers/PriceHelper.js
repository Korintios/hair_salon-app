export const formatPrice = (value) => {
	return value.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
};

export const GetTotalPriceService = (data) => {
	let total = 0;
    
    data.services.forEach((service) => {
        total += service.servicePrice
    })

	return formatPrice(total);
};
