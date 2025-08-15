import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, Typography, Button, Tab, Container, Snackbar, Alert, Checkbox } from "@mui/material";
import { useState, useEffect } from "react";
import AddInventory from "../inventory/AddInventory"
import { supabase } from "../../lib/supabaseClient";
import Loader from "../tools/Loader";

const RenderUserInventory = () => {
    const [inventories, setInventories] = useState([]);

    const [selectedIds, setSelectedIds] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchInventories = async () => {
            setLoading(true);
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) throw new Error('Пользователь не аутентифицирован');

                const res = await fetch("http://localhost:3001/api/inventory", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${session.access_token}`
                    }
                });

                if (!res.ok) throw new Error('Не удалось загрузить инвентарь');
                const data = await res.json();
                setInventories(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchInventories();
    }, []);

    useEffect(() => {
        setIsAllSelected(selectedIds.length > 0 && selectedIds.length === inventories.length);
        setIsIndeterminate(selectedIds.length > 0 && selectedIds.length < inventories.length);
    }, [selectedIds, inventories.length]);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedIds(inventories.map(inventory => inventory.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleRowSelection = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };
    const columns = [
        {
            field: 'selection',
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
        },
        //{ field: 'id', headerName: 'ID', minWidth: 70, flex: 1 },
        { field: 'title', headerName: 'Title', minWidth: 170, flex: 1 },
        { field: 'description', headerName: 'Description', minWidth: 270, flex: 1 },
        { field: 'category', headerName: 'Category', minWidth: 170, flex: 1 },
    ];
    const handleDeleteSelected = async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error("Пользователь не аутентифицирован");

            console.log(selectedIds)
            const query = selectedIds.map(id => `id=${id}`).join('&');
            const res = await fetch(`http://localhost:3001/api/inventory?${query}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ ids: selectedIds }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`Ошибка сервера: ${errorData.message || res.statusText}`);
            }
            setInventories(inventories.filter(row => !selectedIds.includes(row.id)));

            setSelectedIds([]);
            setMessage('Inventory Delete!')
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />


    return (
        <Box>
            <Snackbar
                open={!!message}
                autoHideDuration={6000}
                onClose={() => setMessage(null)}
            >
                <Alert severity="success" onClose={() => setMessage(null)}>
                    {message}
                </Alert>
            </Snackbar>
            <Box sx={{
                display: 'flex',
                gap: 1
            }}>
                <Button
                    sx={{ backgroundColor: 'white', my: 1 }}
                    variant="outlined"
                    onClick={() => setOpenAddModal(true)}
                    disabled={loading}
                >
                    Добавить инвентарь
                </Button>
                <AddInventory
                    open={openAddModal}
                    onClose={() => setOpenAddModal(false)}
                    onAdd={(newInventory) => {
                        setInventories([...inventories, newInventory]);
                        setOpenAddModal(false);
                        setMessage('Inventory add!')
                    }}
                />
                <Button
                    variant="contained"
                    color="error"
                    sx={{ my: 1 }}
                    disabled={!selectedIds.length}
                    onClick={handleDeleteSelected}
                >
                    Удалить выбранное
                </Button>
            </Box>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={inventories}
                    columns={columns}
                    pageSizeOptions={[5, 10, 25, 100]}
                    checkboxSelection={false}
                    sx={{ border: 0 }}
                    autoHeight
                />
            </Paper>
        </Box>

    )
}

export default RenderUserInventory