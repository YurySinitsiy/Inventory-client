import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const RenderAppBar = ({ userName, path }) => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: 'flex', mr: 1 }} />
                    <Typography>Welcome, {userName ? userName : 'Guest'} </Typography>
                    <Button
                        sx={{ color: 'white', marginLeft: 'auto', fontWeight: 'bold' }}
                        onClick={() => navigate('/login')}
                        startIcon={path ? <LogoutIcon /> : <LoginIcon />}
                    >
                        {path ? 'Logout' : 'Sign in'}
                    </Button>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default RenderAppBar