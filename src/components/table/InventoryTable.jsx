import { DataGrid } from '@mui/x-data-grid';
import { Checkbox, Box } from "@mui/material";
import { useState, useEffect } from 'react'
import Loader from '../tools/Loader'
import { useNavigate } from "react-router-dom";
import inventoriesColumns from './InventoriesColumns'
const InventoryTable = ({ inventories = [], enotherColumns, selectedIds = [], setSelectedIds = () => { } }) => {
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsAllSelected(selectedIds.length > 0 && selectedIds.length === inventories.length);
        setIsIndeterminate(selectedIds.length > 0 && selectedIds.length < inventories.length);
    }, [selectedIds, inventories.length]);

    const handleSelectAll = (event) => {
        setSelectedIds(event.target.checked ? inventories.map(i => i.id) : []);
    };

    const handleRowSelection = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };
    const selectionColumn = 
        {
            field: "selection",
            width: 50,
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => (
                <Checkbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={handleSelectAll}
                />
            ),
            renderCell: (params) => (
                <Checkbox
                    checked={selectedIds.includes(params.id)}
                    onChange={() => handleRowSelection(params.id)}
                    onClick={(e) => e.stopPropagation()}
                />
            ),
        }
    ;

    const columns = [selectionColumn, ...inventoriesColumns]

    if (!inventories) return <Loader />;
    return (
        <DataGrid
            rows={inventories}
            columns={enotherColumns || columns}
            pageSizeOptions={[10]}
            checkboxSelection={false}
            getRowHeight={() => 'auto'}
            sx={{ border: 0 }}
            rowSelection={false}
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                },
            }}
            onRowClick={(params) => navigate(`/inventory/${params.id}`)}
            autoHeight
        />
    );
};

export default InventoryTable;