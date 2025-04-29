const express = require("express");
const { cacheMiddleware } = require("./middleware/cacheMiddleware.js");
const { commandLineUtil } = require("./utils/commandLineUtil.js");
const { RedisClient } = require("./utils/createRedisClient.js");

const { url, port } = commandLineUtil();
const expressApp = express();
expressApp.use(cacheMiddleware(url));

if (port === undefined || url === undefined)
	return new Error("Cannot start server");

expressApp.listen(port, () => {
	console.log("Server started at port " + port);
	RedisClient.getInstance();
});

module.exports = { expressApp };
