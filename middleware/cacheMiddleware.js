const { handleRequest } = require("../utils/handleRequest");
const { isKeyPresent, getkey, setkey } = require("../utils/redisUtils");

const cacheMiddleware = (url) => {
	return async (req, res, next) => {
		const urlFromRequest = req.originalUrl;
		const methodFromRequest = req.method;
		const transfomedURL = `${url}${urlFromRequest}`;

		if (await isKeyPresent(urlFromRequest)) {
			console.log("Cache Hit");
			res.send(await getkey(urlFromRequest));
		} else {
			handleRequest(transfomedURL, methodFromRequest)
				.then(async (result) => {
					await setkey(
						urlFromRequest,
						JSON.stringify(result.data)
					);
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
		}
	};
};

module.exports = { cacheMiddleware };
