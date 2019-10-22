import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { convertToDate, convertMinutesToHours } from '../utils';

export function TimeLogsList(props) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(
      props.logs.map(log => {
        const project = props.projects.find(project => project.id === log.projectId);
        return {
          ...log,
          projectName: (project && project.name) || '',
          date: convertToDate(log.date),
        };
      }),
    );
  }, [props.logs, props.projects]);

  const formatMinutesToHours = (cell, row) => convertMinutesToHours(row.timeSpent);

  const columns = [
    {
      dataField: 'description',
      text: 'Description',
    },
    {
      dataField: 'timeSpent',
      text: 'Time Spent',
      formatter: formatMinutesToHours,
    },
    {
      dataField: 'projectName',
      text: 'Project Name',
    },
    {
      dataField: 'date',
      text: 'Event Date',
    },
  ];

  return (
    <BootstrapTable
      keyField="description"
      data={logs}
      columns={columns}
      noDataIndication="No time logs found"
      bootstrap4
      striped
      hover
    />
  );
}
