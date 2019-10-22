import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { convertToDate } from '../utils';

export function ClientsList(props) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setClients(
      props.clients.map(client => {
        return {
          ...client,
          created: convertToDate(client.created),
        };
      }),
    );
  }, [props.clients]);

  const columns = [
    {
      dataField: 'id',
      text: '#',
    },
    {
      dataField: 'name',
      text: 'Client Name',
    },
    {
      dataField: 'created',
      text: 'Created',
    },
  ];

  return (
    <BootstrapTable
      keyField="id"
      data={clients}
      columns={columns}
      noDataIndication="No clients found"
      bootstrap4
      striped
      hover
    />
  );
}
