import client from './client';
import Todo from '../types/Todo';

const getCacheValue = (key: string) =>
  new Promise(resolve => {
    client.get(key, (err, results) => {
      if (err) {
        resolve(false);
      } else {
        resolve(JSON.parse(results));
      }
    });
  });

const addCacheValue = (key: string, value: Todo[]) =>
  new Promise((resolve, reject) => {
    client.setex(key, 86400, JSON.stringify(value));
  });
