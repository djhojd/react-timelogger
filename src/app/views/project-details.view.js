import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as fromTimeLogs from '../api/time-logs.api';
import * as fromProjects from '../api/projects.api';
import { TimeLogsList } from '../components';

export function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const projects = fromProjects.getAll();
    const project = projects.find(project => project.id === +id);
    setProject(project);

    const timeLogs = fromTimeLogs.getAll();
    const logs = timeLogs.filter(log => log.projectId === +id);
    setLogs(logs);
  }, [id]);

  if (!project) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="row">
        <h1 className="col-auto mr-auto">Project: {project.name}</h1>
      </div>

      <TimeLogsList logs={logs} projects={[project]} />
    </>
  );
}
