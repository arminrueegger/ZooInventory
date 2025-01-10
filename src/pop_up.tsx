import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface Row {
    id: number;
    firstName: string | null;
    lastName: string | null;
    age: number | null;
}

interface PopUpProps {
    initialData: Row | null;
    onSubmit: (updatedRow: Row) => void;
    onClose: () => void;
}

function PopUp({ initialData, onSubmit, onClose }: PopUpProps) {
    const [formData, setFormData] = useState<Row>(
        initialData || { id: 0, firstName: '', lastName: '', age: null } // Fallback default value
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'age' ? (value ? parseInt(value) : null) : value,
        }));
    };

    const handleSubmit = () => {
        if (formData) {
            onSubmit(formData);
        }
    };

    return (
        <Dialog open={Boolean(initialData)} onClose={onClose}>
            <DialogTitle>Edit Row</DialogTitle>
            <DialogContent>
                <TextField
                    name="firstName"
                    label="First Name"
                    value={formData?.firstName || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="lastName"
                    label="Last Name"
                    value={formData?.lastName || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="age"
                    label="Age"
                    type="number"
                    value={formData?.age !== null ? formData.age : ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PopUp;
