const { createClient } = require("redis");
const RedisClient = (function () {
	let instance;

	async function createClientInstance() {
		const client = await createClient()
			.on("error", (err) =>
				console.log("Redis Client Error", err)
			)
			.connect();
		return client;
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = createClientInstance();
			}
			return instance;
		},
	};
})();

module.exports = { RedisClient };
