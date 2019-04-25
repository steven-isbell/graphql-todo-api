import redis from 'redis';

const { REDIS_HOST = '' } = process.env;
const redisClient = redis.createClient({ host: REDIS_HOST });

redisClient.on('connect', function() {
  console.log(`Connected to Redis on ${REDIS_HOST}`);
});

redisClient.on('error', function(err: Error) {
  console.log('Redis error: ' + err);
});
