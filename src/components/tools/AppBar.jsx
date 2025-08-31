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
import { useContext, useState, useEffect } from 'react';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import { getSession } from '../services/getSession';

const RenderAppBar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userName, setUserName] = useState('Guest');

  // Получаем имя пользователя один раз при монтировании
  useEffect(() => {
    const fetchUserName = async () => {
      const session = await getSession();
      setUserName(
        session?.user?.user_metadata?.user_name ||
          session?.user?.user_metadata?.name ||
          'Guest'
      );
    };

    fetchUserName();

    // слушаем изменения сессии, чтобы имя обновлялось сразу после логина/логаута
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUserName();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Ошибка выхода:', error.message);
    } else {
      console.log('Пользователь вышел из системы');
      setUserName('Guest');
      navigate('/');
    }
  };

  const handleAuthClick = () => {
    if (userName !== 'Guest') {
      handleLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Typography>
            {t('welcome')}, {userName}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {darkMode ? <DarkMode /> : <LightMode />}
              <Switch checked={darkMode} onChange={toggleTheme} />
            </Box>

            <Button onClick={toggleLanguage} sx={{ color: 'white' }}>
              EN <Language /> RU
            </Button>

            <Button
              sx={{ color: 'white', fontWeight: 'bold' }}
              onClick={handleAuthClick}
              startIcon={userName !== 'Guest' ? <Logout /> : <Login />}>
              {userName !== 'Guest' ? t('nav.logout') : t('nav.login')}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default RenderAppBar;
