import { useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from "@mui/material";
import { API_URL } from "./constants";
import { deleteCustomer, saveCustomer, saveTraining, updateCustomer } from "../services/services";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import useFetch from "../hooks/useFetch";
import DeleteIcon from '@mui/icons-material/Delete';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';



function CustomerList() {
    const gridRef = useRef();
    const { data, loading, error, fetchData } = useFetch(`${API_URL}/api/customers`);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const [columnDefs] = useState([
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', filter: true },
        { cellRenderer: params => <Button startIcon={<DeleteIcon />} onClick={() => removeCustomer(params.data)} />, width: 80 },
        { cellRenderer: params => <EditCustomer customer={params.data} editCustomer={editCustomer} />, width: 80 },
        { cellRenderer: params => <AddTraining customer={params.data} addTraining={addTraining} />, width: 80 }
    ]);

    const onBtnExport = (params) => {
        params.columnKeys = ['firstname', 'lastname', 'email', 'phone']
        gridRef.current.api.exportDataAsCsv(params);
    }

    const removeCustomer = (data) => {
        if (window.confirm(`Do you want to delete ${data.firstname} ${data.lastname}`)) {
            deleteCustomer(data.links[0].href)
                .then(res => {
                    if (res.ok) {
                        setMsg('Delete successful');
                        setOpen(true);
                        fetchData();
                    } else {
                        alert(`Something went wrong ${res.status}`);
                    }
                })
                .catch(e => console.log(e));
        }
    }

    const addCustomer = (customer) => {
        saveCustomer(customer)
            .then(res => {
                if (res.ok) {
                    setMsg('Saved a new customer');
                    setOpen(true);
                    fetchData();
                } else {
                    alert(`Something went wrong ${res.status}`);
                }
            })
            .catch(e => console.log(e));
    }

    const editCustomer = (link, customer) => {
        updateCustomer(link, customer)
            .then(res => {
                if (res.ok) {
                    setMsg('Update successful');
                    setOpen(true);
                    fetchData();
                } else {
                    alert(`Something went wrong ${res.status}`);
                }
            })
            .catch(e => console.log(e));
    }

    const addTraining = (training) => {
        saveTraining(training)
            .then(res => {
                if (res.ok) {
                    setMsg('Saved a new training');
                    setOpen(true);
                } else {
                    alert(`Something went wrong ${res.status}`);
                }
            })
            .catch(e => console.log(e));
    }

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong. Try refreshing the page</p>}
            {data &&
                <div className="ag-theme-material" style={{ width: 1150, height: 500, margin: 'auto' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={data.content}
                        ref={gridRef}
                    />
                    <AddCustomer addCustomer={addCustomer} />
                    <Button variant="contained" onClick={onBtnExport}>Export as CSV</Button>
                </div>
            }
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={msg} />
        </>
    );
}
export default CustomerList;