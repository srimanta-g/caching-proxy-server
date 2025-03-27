const yargs = require("yargs");
const express = require("express");

const expressApp = express();
// const yargs = require;

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
			// console.log(argv.port + " " + argv.url);
			startServer(argv.port);
		},
	})
	.help().argv;

function startServer(port) {
	expressApp.listen(port, () => {
		console.log("Server started at port" + port);
	});
}
