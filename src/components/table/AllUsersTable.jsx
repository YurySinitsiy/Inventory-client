import { Box, Paper } from "@mui/material";
import Loader from "../tools/Loader";
import Snackbar from "../tools/Snackbar";
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserData } from "../services/hooks/useUserData";
import ActionsAllUsers from "../actions/ActionsAllUsers";

const RenderUsersTable = () => {
    const { allUsers, loading } = useUserData()

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            minWidth: 170,
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 170,
            flex: 1
        },
        {
            field: 'surname',
            headerName: 'Surname',
            minWidth: 170,
            flex: 1
        },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 170,
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 170,
            flex: 1
        }
    ]
    if (loading) return <Loader />;

    return (
        <Box>
            <ActionsAllUsers />
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={allUsers}
                    columns={columns}
                    pageSizeOptions={[10]}
                    checkboxSelection={false}
                    autoHeight
                    sx={{ border: 0 }}
                    rowSelection={false}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                //onRowClick={(params) => navigate(`/inventory/${params.id}`)}
                />

            </Paper>
        </Box>
    )

}

export default RenderUsersTable