import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { CreateClientModal, ClientsList } from '../components';
import * as fromClients from '../api/clients.api';

export function ClientsView() {
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setClients(fromClients.getAll());
  }, []);

  const handleSubmit = data => {
    console.log(data);

    const client = fromClients.create(data.name);
    setClients(prevState => [...prevState, client]);

    setShowModal(false);
  };

  return (
    <>
      <div className="row">
        <h1 className="col-auto mr-auto">Clients</h1>
        <div className="col-auto">
          <Button variant="success" onClick={() => setShowModal(true)}>
            + CREATE CLIENT
          </Button>
          <CreateClientModal show={showModal} onHide={() => setShowModal(false)} onSubmit={handleSubmit} />
        </div>
      </div>

      <ClientsList clients={clients} />
    </>
  );
}
