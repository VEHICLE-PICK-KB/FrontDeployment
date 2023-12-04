import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AddTraining from './Addtrain.jsx';
import { format } from 'date-fns';

function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const dateFormatter = (params) => {
    const formattedDate = format(new Date(params.value), 'dd.MM.yyyy HH:mm');
    return formattedDate;
  };

  const columnDefs = [
    { headerName: 'Activity', field: 'activity', sortable: true, filter: true, width: 400 },
    { headerName: 'Date', field: 'date', sortable: true, filter: true, width: 400, valueFormatter: dateFormatter },
    { headerName: 'Duration (minutes)', field: 'duration', sortable: true, filter: true, width: 200 },
    { 
      headerName: 'Customer', 
      field: 'customer', 
      sortable: true, 
      filter: true, 
      width: 400,
      valueGetter: params => `${params.data.customer.firstname} ${params.data.customer.lastname}` 
    },
    {
      headerName: 'Actions',
      width: 300,
      cellRenderer: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
          <Button size="small" color="error" onClick={() => deleteTraining(params.data.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const fetchTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error("Error in fetch:" + response.statusText);
      })
      .then(data => setTrainings(data.map(training => ({
        ...training,
        customer: {
          firstname: training.customer?.firstname ?? '',
        lastname: training.customer?.lastname ?? '',
        },
      }))))
      .catch(err => console.error(err));
  }

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          fetchTrainings();
        } else {
          throw new Error("Error in DELETE: " + response.statusText);
        }
      })
      .catch(err => console.error(err));
    }
  };

  return (
   <div> <h1>Traininglist</h1>
    <div className="ag-theme-material" style={{ height: "calc(100vh - 40px)", width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '10px', alignSelf: 'flex-end' }}>
        <Button component={Link} to="/" variant="outlined" color="error">
          Customer List
        </Button>
        <Button component={Link} to="/calendar" variant="outlined" color="error" style={{ marginLeft: '10px' }}>
          Calendar
        </Button>
        <Button component={Link} to="/statistics" variant="outlined" color="error" style={{ marginLeft: '10px' }}>
          Statistics
        </Button>
      </div>
      <AddTraining fetchTrainings={fetchTrainings}  />
      <div style={{ flex: '1', height: "100%", width: "100%" }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
    </div>
  );
}

export default TrainingList;