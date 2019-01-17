import redis, { RedisClient } from 'redis';

const client: RedisClient = redis.createClient();

client.on('connect', () => {
  console.log(`connected to redis`);
});

client.on('error', (err: string) => {
  throw new Error(err);
});

export default client;
