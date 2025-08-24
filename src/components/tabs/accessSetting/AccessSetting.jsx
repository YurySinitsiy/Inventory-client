import AllUsersTable from "../../table/AllUsersTable"
import { useUserData } from "../../services/hooks/useUserData";
import Loader from "../../tools/Loader";
import { Box } from "@mui/material";
import ActionsAccessWrite from "../../actions/ActionsAccessWrite";
const accessSetting = ({ inventory }) => {
    const { allUsersAccess, loading, selectedIds, setSelectedIds, fetchUsersAccess } = useUserData({ inventoryId: inventory.id })

    const usersColumns = [
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'surname', headerName: 'Surname', flex: 1 },
        { field: 'hasAccess', headerName: 'Has access', flex: 1, type: 'boolean' }
    ]

    if (loading) return <Loader />;
    return (
        <Box>
            <ActionsAccessWrite
                selectedIds={selectedIds}
                loading={loading}
                inventoryId={inventory.id}
                setSelectedIds={setSelectedIds}
                fetchUsersAccess={fetchUsersAccess}
            />
            <AllUsersTable
                usersColumns={usersColumns}
                rows={allUsersAccess}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
            />

        </Box>

    )
}

export default accessSetting