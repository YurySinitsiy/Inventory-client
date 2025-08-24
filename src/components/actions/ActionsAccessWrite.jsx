import { Box, Button } from "@mui/material";

const ActionsAccessWrite = ({ selectedIds }) => {
    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
                variant='outlined'
                sx={{ my: 1 }}
                //onClick={deleteUser}
                disabled={!selectedIds.length}
                color="success">
                Give access
            </Button>
            <Button
                variant='outlined'
                sx={{ my: 1 }}
                disabled={!selectedIds.length}
                color='error'>
                Remove access
            </Button>
        </Box>
    )
}

export default ActionsAccessWrite