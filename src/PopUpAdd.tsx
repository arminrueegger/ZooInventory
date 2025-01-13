import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface AddPopUpProps {
    handleSubmit: (data: { name: string; art: 'Löwe' | 'Elephant' | 'Tiger'; geburtstag: string | null; preis: number }) => void;
}

const ART_OPTIONS = ['Löwe', 'Elephant', 'Tiger'];

const AddPopUp: React.FC<AddPopUpProps> = ({ handleSubmit }) => {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        art: 'Löwe',
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
            art: formData.art as 'Löwe' | 'Elephant' | 'Tiger',
            geburtstag: formData.geburtstag || null,
            preis: parseInt(formData.preis, 10),
        });
        setFormData({ name: '', art: 'Löwe', geburtstag: '', preis: '' });
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                Add Animal
            </Button>
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
