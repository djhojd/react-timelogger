import { lsKey } from './db';
import { getRandomInt } from '../utils';

export function create(name, clientId = null, deadline) {
  const appData = JSON.parse(localStorage.getItem(lsKey));
  const project = {
    name,
    clientId,
    deadline,
    id: getRandomInt(1000),
    created: Date.now(),
    isOpen: true,
  };

  appData.projects.push(project);
  localStorage.setItem(lsKey, JSON.stringify(appData));

  return project;
}

export function update(id, data = {}) {
  const appData = JSON.parse(localStorage.getItem(lsKey));
  const idx = appData.projects.findIndex(project => project.id === id);
  appData.projects[idx] = { ...appData.projects[idx], ...data };
  localStorage.setItem(lsKey, JSON.stringify(appData));
}

export function getAll() {
  const db = JSON.parse(localStorage.getItem(lsKey));
  return db.projects;
}
