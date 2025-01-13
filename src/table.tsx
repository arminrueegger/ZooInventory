import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import PopUp from './pop_up.tsx';
import { Row } from './interfaces.ts';

interface TableProps {
    rows: Row[];
    setRows: React.Dispatch<React.SetStateAction<Row[]>>;
}

function Table({ rows, setRows }: TableProps) {
    const [selectedRow, setSelectedRow] = React.useState<Row | null>(null);
    const [isEditOpen, setIsEditOpen] = React.useState(false);

    const handleEditClick = (row: Row) => {
        setSelectedRow(row);
        setIsEditOpen(true);
    };

    const handleEditSubmit = (updatedRow: Row) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
        );
        setIsEditOpen(false);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'art', headerName: 'Art', width: 130 },
        { field: 'geburtstag', headerName: 'Geburtstag', width: 130 },
        { field: 'preis', headerName: 'Preis', type: 'number', width: 90 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button variant="contained" onClick={() => handleEditClick(params.row)}>
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <>
            <Paper sx={{ height: 400, width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
            {isEditOpen && selectedRow && (
                <PopUp
                    initialData={selectedRow}
                    onSubmit={handleEditSubmit}
                    onClose={() => setIsEditOpen(false)}
                />
            )}
        </>
    );
}

export default Table;
