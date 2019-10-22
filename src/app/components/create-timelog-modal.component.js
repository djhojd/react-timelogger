import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { SingleDatePicker } from 'react-dates';

export function CreateTimelogModal(props) {
  const [datepickerFocused, setDatepickerFocused] = useState(false);
  const [formValue, setFormValue] = useState({
    description: '',
    projectId: null,
    date: null,
    timeSpent: 30,
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(props.projects.filter(project => project.isOpen === true));
  }, [props.projects]);

  const handleChange = event => {
    const { target } = event;
    const value = ['projectId', 'timeSpent'].includes(target.name) ? +target.value : target.value;

    setFormValue(prevState => ({
      ...prevState,
      [target.name]: value,
    }));
  };

  const handleDateChange = date => {
    setFormValue(prevState => ({
      ...prevState,
      date,
    }));
  };

  const handleFocusChange = event => {
    setDatepickerFocused(event.focused);
  };

  const handleSubmit = () => {
    props.onSubmit({ ...formValue, date: formValue.date.valueOf() });
  };

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Add new time event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="event-description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter event description"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="event-project">
              <Form.Label>Select project</Form.Label>
              <Form.Control as="select" name="projectId" onChange={handleChange}>
                <option value="">...</option>
                {projects.map(project => {
                  return (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="event-date">
              <Form.Label>Select date</Form.Label>
              <br />
              <SingleDatePicker
                small={true}
                numberOfMonths={1}
                date={formValue.date}
                onDateChange={handleDateChange}
                focused={datepickerFocused}
                onFocusChange={handleFocusChange}
                openDirection="down"
              />
            </Form.Group>
            <Form.Group controlId="event-time-spent">
              <Form.Label>Time spent (in minutes)</Form.Label>
              <Form.Control
                type="text"
                name="timeSpent"
                placeholder="Enter amount of minutes spent on this event"
                value={formValue.timeSpent}
                onChange={handleChange}
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
    </>
  );
}
