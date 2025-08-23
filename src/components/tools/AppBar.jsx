import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';
import { supabase } from "../../lib/supabaseClient"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeContext } from './ThemeContext';
import { useContext } from "react";
const RenderAppBar = ({ userName, path}) => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleAuthClick = async () => {
        if (path === 'logout') {
            await supabase.auth.signOut();
            navigate('/'); 
        } else {
            navigate('/login');
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: 'flex', mr: 1 }} />
                    <Typography>Welcome, {userName ? userName : 'Guest'} </Typography>

                    {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
                    <Switch checked={darkMode} onChange={toggleTheme} />

                    <Button
                        sx={{ color: 'white', marginLeft: 'auto', fontWeight: 'bold' }}
                        onClick={handleAuthClick}
                        startIcon={path === 'logout' ? <LogoutIcon /> : <LoginIcon />}
                    >
                        {path === 'logout' ? 'Logout' : 'Sign in'}
                    </Button>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default RenderAppBar