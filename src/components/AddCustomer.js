import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add a customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New customer</DialogTitle>
                <DialogContent>
                    <TextField
                        label="First name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        value={customer.firstname}
                        onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
                    />
                    <TextField
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        value={customer.lastname}
                        onChange={e => setCustomer({ ...customer, lastname: e.target.value })}

                    />
                    <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        required
                        value={customer.email}
                        onChange={e => setCustomer({ ...customer, email: e.target.value })}

                    />
                    <TextField
                        label="Phone number"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        value={customer.phone}
                        onChange={e => setCustomer({ ...customer, phone: e.target.value })}

                    />
                    <TextField
                        label="Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={customer.streetaddress}
                        onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}

                    />
                    <TextField
                        label="Postal code"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={customer.postcode}
                        onChange={e => setCustomer({ ...customer, postcode: e.target.value })}

                    />
                    <TextField
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={customer.city}
                        onChange={e => setCustomer({ ...customer, city: e.target.value })}

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
export default AddCustomer;