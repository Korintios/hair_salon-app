/**
 * Esta funcion se encarga de hacer las peticiones a la API de la aplicacion bajo las 4 distintas de peticiones disponibles: GET, POST, PUT y DELETE
 * @param {*} method El metodo que se utilizara para la peticion.
 * @param {*} data La informacion a ingresar en caso de que se trate de un POST o PUT.
 * @param {*} section El tipo de seccion que abarcara la api, en este caso cuenta con dos que seria reception y inventory.
 * @param {*} action Accion a Ejecutar (create,delete,update).
 * @param {*} id El id a solicitar en caso de que se quiera hacer uso de un indice unico en la peticion.
 * @param {*} callback Funcion a retornar.
 */
export const useAPI = async (method = "GET", data = null, section, action, id, callback) => {
	const BASE_URL = "http://localhost:3000/api/";
	let RequestInit = {};
    let finalUrl

	try {
		if (section === "reception" || section === "inventory" || section === "service") {
			if (method === "POST" || method === "PUT" || method === "DELETE") {

                finalUrl = BASE_URL.concat(section, "/", action)

				RequestInit = {
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
					},
					method: method,
				};

                if (method === "DELETE") {
                    RequestInit = {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: method,
                    };
                }

                if (method === "PUT" || method === "DELETE") {
                    finalUrl = BASE_URL.concat(section, '/', action, '/', id)
                }
			} else {
				finalUrl = BASE_URL.concat(section, "/", action)
			}

			await fetch(finalUrl, RequestInit).then(
				(response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("Network response was not ok.");
					}
				}
			)
            .then((jsonResponse) => {
                callback(null, jsonResponse);
            })
            .catch((error) => {
                callback(error, null);
            });
		} else {
			throw new Error("This Section is not Avaliable.");
		}
	} catch (err) {
		console.log(err);
	}
};
