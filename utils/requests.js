const axios = require("axios");

const getRequest = (url, resolve, reject) => {
	axios.get(url)
		.then((res) => {
			resolve(res);
		})
		.catch((error) => {
			reject(error);
		});
};

module.exports = { getRequest };
