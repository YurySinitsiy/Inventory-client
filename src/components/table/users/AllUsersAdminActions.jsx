import { Box } from "@mui/material";
import Loader from "../../tools/Loader";
import { useUserData } from "../../services/hooks/useUserData";
import ActionsAllUsers from "../../actions/ActionsAllUsers";
import AllUsersTable from "../AllUsersTable"
const RenderUsersTable = () => {
    const { allUsers, loading, selectedIds, setSelectedIds, } = useUserData()

    const usersColumns = [
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
            <ActionsAllUsers
                selectedIds={selectedIds} />
            <AllUsersTable
                usersColumns={usersColumns}
                rows={allUsers}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds} />

        </Box>
    )

}

export default RenderUsersTable