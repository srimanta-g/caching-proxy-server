const { RedisClient } = require("./createRedisClient");

const isKeyPresent = async (key) => {
	try {
		const redisClient = await RedisClient.getInstance();
		const isPresent = await redisClient.exists(key);
		if (isPresent === 0) return false;
		return true;
	} catch (error) {
		console.log(error);
	}
};

const getkey = async (key) => {
	try {
		const redisClient = await RedisClient.getInstance();
		const value = await redisClient.get(key);
		if (value !== null) return value;
		else return null;
	} catch (error) {
		console.log(error);
	}
};

const setkey = async (key, value) => {
	try {
		const redisClient = await RedisClient.getInstance();
		await redisClient.set(key, value);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { isKeyPresent, getkey, setkey };
