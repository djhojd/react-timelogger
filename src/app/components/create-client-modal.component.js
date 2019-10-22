import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export function CreateClientModal(props) {
  const [formValue, setFormValue] = useState({
    name: '',
  });

  const handleChange = event => {
    const { target } = event;

    setFormValue(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = () => {
    props.onSubmit(formValue);
  };

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Create new client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="client-name">
            <Form.Label>Client name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter client name" onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
