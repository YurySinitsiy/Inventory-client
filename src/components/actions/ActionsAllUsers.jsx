import { Box, Button } from "@mui/material";


const ActionsAllUsers = () => {
    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
                variant='outlined'
                sx={{ my: 1 }}>
                Удалить
            </Button>
            <Button
                variant='outlined'
                sx={{ my: 1 }}>
                Заблокировать
            </Button>
            <Button
                variant='outlined'
                sx={{ my: 1 }}>
                Разблокировать
            </Button>
        </Box>

    )
}

export default ActionsAllUsers