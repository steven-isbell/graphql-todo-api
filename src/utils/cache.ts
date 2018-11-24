import client from './client';
import Todo from '../types/Todo';

const getCacheValue = (key: string): Promise<Todo[]> =>
  new Promise((resolve, reject) => {
    client.get(key, (err, results) => {
      if (err) {
        reject(false);
      } else {
        resolve(JSON.parse(results));
      }
    });
  });

const addCacheValue = (key: string, value: Todo): Promise<Todo[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const items = await getCacheValue(key);
      items.push(value);
      client.setex(key, 86400, JSON.stringify(items));
      resolve(items);
    } catch (e) {
      reject(e);
    }
  });

const removeCacheValue = (key: string, id: number): Promise<Todo[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const items = await getCacheValue(key);
      let updated = items.filter(val => val.id !== id);
      client.set(key, JSON.stringify(updated));
      resolve(updated);
    } catch (e) {
      reject(e);
    }
  });
