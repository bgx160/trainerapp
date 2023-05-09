import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';

function EditCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: props.customer.firstname,
        lastname: props.customer.lastname,
        email: props.customer.email,
        phone: props.customer.phone,
        streetaddress: props.customer.streetaddress,
        postcode: props.customer.postcode,
        city: props.customer.city
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        props.editCustomer(props.customer.links[0].href, customer);
        setOpen(false);
    }

    return (
        <div>
            <Button startIcon={<EditIcon />} onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <TextField
                        label="First name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={customer.firstname}
                        onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
                    />
                    <TextField
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={customer.lastname}
                        onChange={e => setCustomer({ ...customer, lastname: e.target.value })}

                    />
                    <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={customer.email}
                        onChange={e => setCustomer({ ...customer, email: e.target.value })}

                    />
                    <TextField
                        label="Phone number"
                        type="text"
                        fullWidth
                        variant="standard"
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
export default EditCustomer;