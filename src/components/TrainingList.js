import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Snackbar } from "@mui/material/";
import { Button } from "@mui/material/";
import { API_URL } from "./constants";
import { deleteTraining } from "../services/services";
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete'
import useFetch from "../hooks/useFetch";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const formatDate = (params) => {
    return dayjs(params.value).format('DD.MM.YYYY HH:mm');
}

function TrainingList() {
    const { data, loading, error, fetchData } = useFetch(`${API_URL}/gettrainings`);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [columnDefs] = useState([
        {
            field: 'customer.firstname',
            headerName: 'Firstname',
            filter: true,
            sortable: true
        },
        {
            field: 'customer.lastname',
            headerName: 'Lastname',
            filter: true,
            sortable: true
        },
        {
            field: 'activity',
            filter: true,
            sortable: true
        },
        {
            field: 'duration',
            sortable: true,
            width: 120
        },
        {
            field: 'date',
            sortable: true,
            valueFormatter: formatDate
        },
        {
            cellRenderer: params => <Button startIcon={<DeleteIcon />} onClick={() => removeTraining(params)} />
        }
    ]);

    const removeTraining = (params) => {
        if (window.confirm('Do you want to delete ' + params.data.activity)) {
            deleteTraining(params.data.id)
                .then(res => {
                    if (res.ok) {
                        setMsg('Delete succesful');
                        setOpen(true);
                        fetchData();
                    } else {
                        alert(`Something went wrong ${res.status}`);
                    }
                })
                .catch(e => console.log(e));
        }
    }

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong. Try refreshing the page</p>}
            {data &&
                <div
                    className="ag-theme-material"
                    style={{ width: 1150, height: 500, margin: 'auto' }}>
                    <AgGridReact
                        style={{ width: '100%', height: '100%;' }}
                        columnDefs={columnDefs}
                        rowData={data}
                    />
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
export default TrainingList;