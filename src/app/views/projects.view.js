import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { CreateProjectModal, ProjectsList } from '../components';
import * as fromClients from '../api/clients.api';
import * as fromProjects from '../api/projects.api';

export function ProjectsView() {
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setClients(fromClients.getAll());
    setProjects(fromProjects.getAll());
  }, []);

  const handleSubmit = data => {
    const project = fromProjects.create(data.name, data.clientId, data.deadline);
    setProjects(prevState => [...prevState, project]);

    setShowModal(false);
  };

  const handleCloseProject = projectId => {
    fromProjects.update(projectId, { isOpen: false });
    setProjects(fromProjects.getAll());
  };

  return (
    <>
      <div className="row">
        <h1 className="col-auto mr-auto">Projects</h1>
        <div className="col-auto">
          <Button variant="success" onClick={() => setShowModal(true)}>
            + CREATE PROJECT
          </Button>
          <CreateProjectModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onSubmit={handleSubmit}
            clients={clients}
          />
        </div>
      </div>

      <ProjectsList projects={projects} clients={clients} onCloseProject={handleCloseProject} />
    </>
  );
}
