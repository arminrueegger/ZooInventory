export interface Row {
    id: number;
    name: string;
    art: 'Säugetier' | 'Fisch' | 'Eiertier' | 'Vogel';
    geburtstag: string | null;
    preis: number;
}