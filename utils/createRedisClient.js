const { createClient } = require("redis");
const RedisClient = (function () {
	let instance;

	async function createClientInstance() {
		try {
			const obj = createClient().connect();
			return obj;
		} catch (error) {
			console.log(error);
		}
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
