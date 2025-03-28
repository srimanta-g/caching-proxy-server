const yargs = require("yargs");
const express = require("express");
const { handleRequest } = require("./handleRequest");

const expressApp = express();

let targetURL;
let port;

// Middle ware to handle all requests
expressApp.use((req, res, next) => {
	const urlFromRequest = req.originalUrl;
	const methodFromRequest = req.method;
	const transfomedURL = `${targetURL}${urlFromRequest}`;

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

function startExpressServer() {
	if (port == undefined) return new Error("Port Missing");
	expressApp.listen(port, () => {
		console.log("Server started at port " + port);
	});
}

yargs
	.command({
		command: "caching-proxy",
		describe: "To start the caching server",
		builder: {
			port: {
				describe: "Port at which the caching server will listen to.",
				demandOption: true,
				type: Number,
			},
			url: {
				describe: "Traget url",
				demandOption: true,
				type: String,
			},
		},
		handler(argv) {
			targetURL = argv.url;
			port = argv.port;
			startExpressServer();
		},
	})
	.help().argv;
