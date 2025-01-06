import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface PopUpProps {
    onSubmit: (newData: { firstName: string, lastName: string, age: string, id: number }) => void;
    rowToEdit: { id: number, firstName: string, lastName: string, age: string } | null;
    open: boolean;
    onClose: () => void;
}

export default function PopUp({ onSubmit, rowToEdit, open, onClose }: PopUpProps) {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        age: '',
    });

    React.useEffect(() => {
        if (rowToEdit) {
            setFormData({
                firstName: rowToEdit.firstName,
                lastName: rowToEdit.lastName,
                age: rowToEdit.age,
            });
        }
    }, [rowToEdit]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (rowToEdit) {
            onSubmit({ ...formData, id: rowToEdit.id });
        }
        onClose(); 
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Details</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Age"
                    type="number"
                    fullWidth
                    variant="outlined"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
