import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { SingleDatePicker } from 'react-dates';

export function CreateProjectModal(props) {
  const [datepickerFocused, setDatepickerFocused] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    clientId: null,
    deadline: null,
  });

  const handleChange = event => {
    const { target } = event;
    const value = target.name === 'clientId' ? +target.value : target.value;

    setFormValue(prevState => ({
      ...prevState,
      [target.name]: value,
    }));
  };

  const handleDateChange = deadline => {
    setFormValue(prevState => ({
      ...prevState,
      deadline,
    }));
  };

  const handleFocusChange = event => {
    setDatepickerFocused(event.focused);
  };

  const handleSubmit = () => {
    props.onSubmit({ ...formValue, deadline: formValue.deadline.valueOf() });
  };

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Create new project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="project-name">
            <Form.Label>Project name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter project name" onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="project-client">
            <Form.Label>Select client</Form.Label>
            <Form.Control as="select" name="clientId" onChange={handleChange}>
              <option value="">...</option>
              {props.clients.map(client => {
                return (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Deadline</Form.Label>
            <br />
            <SingleDatePicker
              small={true}
              numberOfMonths={1}
              date={formValue.deadline}
              onDateChange={handleDateChange}
              focused={datepickerFocused}
              onFocusChange={handleFocusChange}
              openDirection="down"
            />
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
