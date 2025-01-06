import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Navbar from './navbar.tsx';
import Table from './table.tsx';
import PopUp from './pop_up.tsx';

interface Row {
  id: number;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
}

const App = () => {
  const [rows, setRows] = React.useState<Row[]>([
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]);

  const handleFormSubmit = (newData: { firstName: string; lastName: string; age: string }) => {
    const newRow: Row = {
      id: rows.length + 1,
      firstName: newData.firstName,
      lastName: newData.lastName,
      age: newData.age ? parseInt(newData.age) : null,
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  return (
      <StrictMode>
        <Navbar />
        <Table rows={rows} setRows={setRows} />
        <PopUp onSubmit={handleFormSubmit} />
      </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
