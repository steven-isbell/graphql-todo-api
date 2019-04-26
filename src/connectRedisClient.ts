import redis from 'redis';

const { REDIS_HOST = '', REDIS_PORT = '' } = process.env;

const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT, 10)
});

redisClient.on('connect', function() {
  console.log(`Connected to Redis on ${REDIS_HOST}`);
});

redisClient.on('error', function(err: Error) {
  console.log('Redis error: ' + err);
});
