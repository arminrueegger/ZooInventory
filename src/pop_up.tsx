import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Row } from './interfaces.ts';

interface PopUpProps {
    initialData: Row | null;
    onSubmit: (updatedRow: Row) => void;
    onClose: () => void;
}

function PopUp({ initialData, onSubmit, onClose }: PopUpProps) {
    const [formData, setFormData] = useState<Row>(
        initialData || { id: 0, name: '', art: 'Löwe', geburtstag: null, preis: 0 }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'preis' ? parseInt(value, 10) : value,
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
                    name="name"
                    label="Name"
                    value={formData?.name || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="art"
                    label="Art"
                    value={formData?.art || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="geburtstag"
                    label="Geburtstag"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData?.geburtstag || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="preis"
                    label="Preis"
                    type="number"
                    value={formData?.preis || 0}
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
