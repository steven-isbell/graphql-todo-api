import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log(`connected to redis`);
});

client.on('error', err => {
  throw new Error(err);
});
