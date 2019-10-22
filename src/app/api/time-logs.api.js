import { lsKey } from './db';
import { getRandomInt } from '../utils';

export function create(description, projectId, date, timeSpent) {
  const db = JSON.parse(localStorage.getItem(lsKey));
  const log = {
    description,
    projectId,
    date,
    timeSpent,
    id: getRandomInt(1000),
    created: Date.now(),
  };

  db.timeLogs.push(log);
  localStorage.setItem(lsKey, JSON.stringify(db));

  return log;
}

export function getAll() {
  const db = JSON.parse(localStorage.getItem(lsKey));
  return db.timeLogs;
}
