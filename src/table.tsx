import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import PopUp from './pop_up.tsx';

function Table({ rows, setRows }) {
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isEditOpen, setIsEditOpen] = React.useState(false);

    const handleEditClick = (row) => {
        setSelectedRow(row);
        setIsEditOpen(true);
    };

    const handleEditSubmit = (updatedData) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === selectedRow.id ? { ...row, ...updatedData, age: parseInt(updatedData.age) } : row
            )
        );
        setIsEditOpen(false);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 130,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEditClick(params.row)}
                >
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
            {isEditOpen && (
                <PopUp
                    onSubmit={handleEditSubmit}
                    initialData={{
                        firstName: selectedRow?.firstName || '',
                        lastName: selectedRow?.lastName || '',
                        age: selectedRow?.age?.toString() || '',
                    }}
                />
            )}
        </>
    );
}

export default Table;
