export const lsKey = 'timelogger';

export function init() {
  const db = localStorage.getItem(lsKey);
  if (!db) {
    localStorage.setItem(
      lsKey,
      JSON.stringify({
        // projects: [{ clientId: 1, created: 1571681980255, id: 1, name: 'Project #1', deadline: 1571691980255 }],
        projects: [],
        // clients: [{ created: 1571681971450, id: 1, name: 'Client #1' }],
        clients: [],
        timeLogs: [],
      }),
    );
  }
}
