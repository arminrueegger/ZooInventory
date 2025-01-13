import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Navbar from './navbar.tsx';
import Table from './table.tsx';
import AddPopUp from './PopUpAdd.tsx';
import { Row } from './interfaces.ts';

const App = () => {
  const [rows, setRows] = React.useState<Row[]>([
    { id: 1, name: 'Leo', art: 'Säugetier', geburtstag: '1990-01-01', preis: 100 },
    { id: 2, name: 'Dumbo', art: 'Säugetier', geburtstag: null, preis: 200 },
    { id: 3, name: 'Shere Khan', art: 'Fisch', geburtstag: '1985-05-15', preis: 150 },
    { id: 4, name: 'Simba', art: 'Fisch', geburtstag: '2000-07-20', preis: 80 },
    { id: 5, name: 'Manny', art: 'Eiertier', geburtstag: null, preis: 50 },
    { id: 6, name: 'Rajah', art: 'Eiertier', geburtstag: '1975-10-10', preis: 300 },
    { id: 7, name: 'Aslan', art: 'Vogel', geburtstag: '1999-03-25', preis: 180 },
    { id: 8, name: 'Ella', art: 'Vogel', geburtstag: '1980-11-30', preis: 120 },
    { id: 9, name: 'Bagheera', art: 'Säugetier', geburtstag: null, preis: 250 },
    { id: 10, name: 'Mufasa', art: 'Fisch', geburtstag: '1992-06-15', preis: 95 },
  ]);


  const handleFormSubmit = (newData: { name: string; art: string; geburtstag: string | null; preis: string }) => {
    const newRow: Row = {
      id: rows.length + 1,
      name: newData.name,
      art: newData.art as 'Säugetier' | 'Fisch' | 'Eiertier' | 'Vogel',
      geburtstag: newData.geburtstag || null,
      preis: parseInt(newData.preis, 10),
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  return (
      <StrictMode>
        <Navbar />
        <Table rows={rows} setRows={setRows} />
        <AddPopUp handleSubmit={handleFormSubmit} />
      </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
