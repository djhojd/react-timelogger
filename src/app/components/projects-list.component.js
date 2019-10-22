import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import { convertToDate } from '../utils';

export function ProjectsList(props) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(
      props.projects.map(project => {
        const client = props.clients.find(client => client.id === project.clientId);
        return {
          ...project,
          clientName: (client && client.name) || '',
          deadline: convertToDate(project.deadline),
        };
      }),
    );
  }, [props.projects, props.clients]);

  const closeButton = (cell, row) => {
    return row.isOpen ? <Button onClick={() => props.onCloseProject(row.id)}>Close</Button> : 'Completed';
  };

  const viewLogsButton = (cell, row) => {
    return <Link to={/projects/ + row.id}>View Logs</Link>;
  };

  const columns = [
    {
      dataField: 'id',
      text: '#',
    },
    {
      dataField: 'name',
      text: 'Product Name',
    },
    {
      dataField: 'clientName',
      text: 'Client Name',
    },
    {
      dataField: 'deadline',
      text: 'Deadline',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Status',
      isDummyField: true,
      formatter: closeButton,
    },
    {
      dataField: 'action',
      text: '',
      isDummyField: true,
      formatter: viewLogsButton,
    },
  ];

  return (
    <BootstrapTable
      keyField="id"
      data={projects}
      columns={columns}
      noDataIndication="No projects found"
      bootstrap4
      striped
      hover
    />
  );
}
