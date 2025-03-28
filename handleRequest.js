const axios = require("axios");

const handleRequest = (url, method) => {
	return new Promise((resolve, reject) => {
		if (method === "GET") {
			axios.get(url)
				.then((res) => {
					// console.log(res);
					resolve(res);
				})
				.catch((error) => {
					reject(error);
				});
		} else {
			reject("Unsupported method");
		}
	});
};

module.exports = { handleRequest };
