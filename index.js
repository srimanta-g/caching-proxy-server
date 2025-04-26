const express = require("express");
const { cacheMiddleware } = require("./middleware/cacheMiddleware.js");
const { commandLineUtil } = require("./utils/commandLineUtil.js");

const { url, port } = commandLineUtil();
const expressApp = express();
expressApp.use(cacheMiddleware(url));

if (port === undefined || url === undefined)
	return new Error("Cannot start server");

expressApp.listen(port, () => {
	console.log("Server started at port " + port);
});

module.exports = { expressApp };
