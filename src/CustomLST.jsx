
import React, { useEffect, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const gridRef = useRef();
  const onGridReady = (params) => {
    gridRef.current = params.api;
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const [columnDefs] = useState([
    { headerName: "First Name", field: "firstname", sortable: true, filter: true },
    { headerName: "Last Name", field: "lastname", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Phone", field: "phone", sortable: true, filter: true },
    { headerName: "City", field: "city", sortable: true, filter: true },
    { headerName: "Street Address", field: "streetaddress", sortable: true, filter: true },
    { headerName: "Postcode", field: "postcode", sortable: true, filter: true },
    {
      cellRenderer: (params) => <EditCustomer fetchCustomers={fetchCustomers} data={params.data} />,
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <Button size="small" color="error" onClick={() => deleteCustomer(params.data.links[0].href)}>
          Delete
        </Button>
      ),
      width: 120,
    },
  ]);

  const fetchCustomers = () => {
    fetch("http://traineeapp.azurewebsites.net/api/customers")
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error in fetch:" + response.statusText);
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) fetchCustomers();
          else throw new Error("Error in DELETE: " + response.statusText);
        })
        .catch((err) => console.error(err));
    }
  };

  const FormCSV = () => {
    if (gridRef.current) {
      const params = {
        fileName: "Customers.csv",
        processCellCallback: (params) => {
          const column = params.column;

        
          if (
            params.node.rowPinned ||
            params.value === null ||
            params.value === undefined ||
            params.value === "" ||
            params.value === "\"" ||
            column.getColDef().headerName === ""
          ) {
            return null;
          }

          return params.value;
        },
      };
      gridRef.current.exportDataAsCsv(params);
    }
  };

  const ClickExport = useCallback(() => {
    FormCSV();
  }, []);

  return (
    <div> <h1>Customers</h1>
    <div className="ag-theme-material" style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "16px", alignSelf: "flex-end" }}>
        <Button component={Link} to="/trainings" variant="outlined" color="error">
        Training List
        </Button>
        <Button component={Link} to="/calendar" variant="outlined" color="error" style={{ marginLeft: '18px', marginRight: "11px" }}>
        Calendar
        </Button>
        <Button component={Link} to="/statistics" variant="outlined" color="error" style={{ marginLeft: '10px' }}>
          Statistics
        </Button>
      </div>
      <AddCustomer fetchCustomers={fetchCustomers} />
      <div style={{ marginLeft: "auto" }}>
        <Button onClick={ClickExport} className="CSVButton" variant="outlined" color="error">
          Export as .CSV
        </Button>
      </div>
      <AgGridReact rowData={customers} columnDefs={columnDefs} onGridReady={onGridReady} pagination={true} paginationPageSize={10} />
    </div>
    </div>
  );
}

export default CustomerList;