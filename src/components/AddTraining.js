import * as React from 'react';
import { useState } from 'react';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import MoreTimeIcon from '@mui/icons-material/MoreTime';



function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: ''
    });

    const handleClickOpen = () => {
        setTraining({ ...training, customer: props.customer.links[0].href });
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        setTraining({ ...training, date: dayjs(training.date).toISOString() });
        props.addTraining(training);
        setOpen(false);
    }

    return (
        <div>
            <Button startIcon={<MoreTimeIcon />} onClick={handleClickOpen} />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DateTimeField
                            onChange={(date) => setTraining({ ...training, date: dayjs(date) })} />
                    </LocalizationProvider>

                    <TextField
                        label="Activity"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}

                    />
                    <TextField
                        label="Duration"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: e.target.value })}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default AddTraining;