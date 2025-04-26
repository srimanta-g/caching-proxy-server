const { handleRequest } = require("../utils/handleRequest");

const cacheMiddleware = (url) => {
	return (req, res, next) => {
		const urlFromRequest = req.originalUrl;
		const methodFromRequest = req.method;
		const transfomedURL = `${url}${urlFromRequest}`;

		handleRequest(transfomedURL, methodFromRequest)
			.then((result) => {
				res.send(result.data);
			})
			.catch((error) =>
				res
					.status(
						error.status === undefined
							? 405
							: error.status
					)
					.send(
						error.message === undefined
							? error
							: error.message
					)
			);
	};
};

module.exports = { cacheMiddleware };
