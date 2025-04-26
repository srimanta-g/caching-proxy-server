const yargs = require("yargs");

const commandLineUtil = () => {
	return yargs
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
				// console.log(argv.url);
				return { url: argv.url, port: argv.port };
			},
		})
		.help().argv;
};

module.exports = { commandLineUtil };
