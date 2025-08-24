import { Box, Button } from "@mui/material";
import { useUserData } from "../services/hooks/useUserData";

const ActionsAllUsers = ({ selectedIds }) => {
    const { handleDeleteUser } = useUserData()

    const deleteUser = async () => {
        handleDeleteUser(selectedIds)
    }
    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
                variant='outlined'
                sx={{ my: 1 }}
                onClick={deleteUser}
                disabled={!selectedIds.length}
                color='error'>
                Delete
            </Button>
            <Button
                variant='outlined'
                sx={{ my: 1 }}
                disabled={!selectedIds.length}
                color="success">

                Unblock
            </Button>
            <Button
                variant='outlined'
                sx={{ my: 1 }}
                disabled={!selectedIds.length}
                color='error'>
                Block
            </Button>
            <Button
                variant='outlined'
                sx={{ my: 1 }}
                disabled={!selectedIds.length}
                color="secondary">
                Admin role
            </Button>
            <Button
                variant='outlined'
                sx={{ my: 1 }}
                disabled={!selectedIds.length}>
                User role
            </Button>
        </Box>

    )
}

export default ActionsAllUsers