import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Switch,
} from '@mui/material';
import {
  Login,
  Logout,
  LightMode,
  DarkMode,
  Language,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';

const RenderAppBar = ({ userName, path }) => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleAuthClick = async () => {
    if (path === 'logout') {
      await supabase.auth.signOut();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar
          disableGutters
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Typography>
            {' '}
            {t('welcome')}, {userName ? userName : 'Guest'}{' '}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            {darkMode ? <DarkMode /> : <LightMode />}
            <Switch checked={darkMode} onChange={toggleTheme} />
          </Box>
          <Button onClick={toggleLanguage} color={'white'}>
            EN <Language /> RU
          </Button>

          <Button
            sx={{ color: 'white', fontWeight: 'bold' }}
            onClick={handleAuthClick}
            startIcon={path === 'logout' ? <Logout /> : <Login />}>
            {path === 'logout' ? t('nav.logout') : t('nav.login')}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default RenderAppBar;
