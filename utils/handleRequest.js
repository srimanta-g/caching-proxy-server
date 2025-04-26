const { getRequest } = require("../utils/requests");

const handleRequest = (url, method) => {
	return new Promise((resolve, reject) => {
		if (method === "GET") {
			getRequest(url, resolve, reject);
		} else {
			reject("Unsupported method");
		}
	});
};

module.exports = { handleRequest };
