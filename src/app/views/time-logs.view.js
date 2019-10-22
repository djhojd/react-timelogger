import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import * as fromProjects from '../api/projects.api';
import * as fromTimeLogs from '../api/time-logs.api';
import { CreateTimelogModal, TimeLogsList } from '../components';

export function TimeTracker() {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setProjects(fromProjects.getAll());
    setLogs(fromTimeLogs.getAll());
  }, []);

  const handleSubmit = data => {
    const log = fromTimeLogs.create(data.description, data.projectId, data.date, data.timeSpent);
    setLogs(prevState => [...prevState, log]);

    setShowModal(false);
  };

  return (
    <>
      <div className="row">
        <h1 className="col-auto mr-auto">Time Tracker</h1>
        <div className="col-auto">
          <Button variant="success" onClick={() => setShowModal(true)}>
            + ADD TIME EVENT
          </Button>
          <CreateTimelogModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onSubmit={handleSubmit}
            projects={projects}
          />
        </div>
      </div>

      <TimeLogsList logs={logs} projects={projects} />
    </>
  );
}
