import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Fab } from '@mui/material';

interface AddPopUpProps {
    handleSubmit: (data: { name: string; art: 'Säugetier' | 'Fisch' | 'Eiertier' | 'Vogel'; geburtstag: string | null; preis: number }) => void;
}

const ART_OPTIONS = ['Säugetier', 'Fisch', 'Eiertier', 'Vogel'];

const AddPopUp: React.FC<AddPopUpProps> = ({ handleSubmit }) => {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        art: 'Säugetier',
        geburtstag: '',
        preis: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit({
            name: formData.name,
            art: formData.art as 'Säugetier' | 'Fisch' | 'Eiertier' | 'Vogel',
            geburtstag: formData.geburtstag || null,
            preis: parseInt(formData.preis, 10),
        });
        setFormData({ name: '', art: 'Säugetier', geburtstag: '', preis: '' });
        setOpen(false);
    };

    return (
        <>
            <Fab
                size="large"
                color="primary"
                aria-label="add"
                onClick={() => setOpen(true)}
            >
                <Button
                    variant="outlined"
                    sx={{
                        minWidth: 'unset',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'white',
                    }}
                >
                    +
                </Button>
            </Fab>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <form onSubmit={onFormSubmit}>
                    <DialogTitle>Add New Animal</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            select
                            name="art"
                            label="Art"
                            value={formData.art}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            {ART_OPTIONS.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            name="geburtstag"
                            label="Geburtstag"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.geburtstag}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            required
                            name="preis"
                            label="Preis"
                            type="number"
                            value={formData.preis}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default AddPopUp;
