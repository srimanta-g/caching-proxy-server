const express = require("express");
const { handleRequest } = require("./handleRequest");
const { commandLineUtil } = require("./commandLineUtil.js");

const expressApp = express();

const { url, port } = commandLineUtil();

// Middle ware to handle all requests
expressApp.use((req, res, next) => {
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
});

if (port == undefined) return new Error("Port Missing");

expressApp.listen(port, () => {
	console.log("Server started at port " + port);
});
