import { lsKey } from './db';
import { getRandomInt } from '../utils';

export function create(name) {
  const db = JSON.parse(localStorage.getItem(lsKey));
  const client = {
    id: getRandomInt(1000),
    name,
    created: Date.now(),
  };

  db.clients.push(client);
  localStorage.setItem(lsKey, JSON.stringify(db));

  return client;
}

export function getAll() {
  const db = JSON.parse(localStorage.getItem(lsKey));
  return db.clients;
}
