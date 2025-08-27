import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { Container, Form, InputGroup } from 'react-bootstrap';

function DataTableView() {
    // Sample data - replace with your actual data
    const [data] = useState([
        { id: 1, name: 'Item 1', category: 'Category A', value: 100, date: '2024-01-15' },
        { id: 2, name: 'Item 2', category: 'Category B', value: 200, date: '2024-02-20' },
        { id: 3, name: 'Item 3', category: 'Category A', value: 300, date: '2024-03-10' },
        { id: 4, name: 'Item 4', category: 'Category C', value: 150, date: '2024-01-25' },
        { id: 5, name: 'Item 5', category: 'Category B', value: 250, date: '2024-04-05' },
    ]);

    const [filterText, setFilterText] = useState('');

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Value',
            selector: row => row.value,
            sortable: true,
            format: row => `$${row.value}`,
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
    ];

    const filteredItems = useMemo(() => {
        return data.filter(item =>
            item.name.toLowerCase().includes(filterText.toLowerCase()) ||
            item.category.toLowerCase().includes(filterText.toLowerCase())
        );
    }, [data, filterText]);

  

    return (
        <Container>
            <h2 className="mb-4">Data Table</h2>
            
            <InputGroup className="mb-3" style={{ maxWidth: '400px' }}>
                <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                />
            </InputGroup>

            <div className="border rounded">
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
                    highlightOnHover
                    striped
                    responsive
                    defaultSortFieldId={1}
                />
            </div>
        </Container>
    );
}

export default DataTableView;