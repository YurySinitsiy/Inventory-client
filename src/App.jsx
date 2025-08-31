import { Routes, Route, BrowserRouter } from 'react-router-dom';

import RequireAuth from './components/auth/RequireAuth';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

import AdminPage from './pages/AdminPage';
import PersonalPage from './pages/PersonalPage';

import NotFound from './pages/NotFound';
import InventoryPage from './pages/InventoryPage';
import { useContext, useState } from 'react';
import {
  ThemeProviderWrapper,
  ThemeContext,
} from './components/tools/ThemeContext';
import OAuthRedirectHandler from './components/auth/OAuthREdirectHandler';
import AppBar from './components/tools/AppBar';
import AppBox from './components/tools/AppBox';
const API_URL = import.meta.env.VITE_API_URL;

function AppContent() {
  const { darkMode } = useContext(ThemeContext);

  const theme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <AppBox>
            <AppBar />
            <Routes>
              {/* Доступ для всех */}
              <Route path='/' element={<MainPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<RegistrationPage />} />
              <Route path='/inventory/:id' element={<InventoryPage />} />
              <Route
                path='/oauth-redirect'
                element={<OAuthRedirectHandler />}
              />
              {/* Только user, admin, creator, write */}

              {/* Только admin */}
              <Route
                path='/admin'
                element={
                  <RequireAuth allowedRoles={['admin']}>
                    <AdminPage />
                  </RequireAuth>
                }
              />

              {/* Только editor */}
              <Route
                path='/personal'
                element={
                  <RequireAuth allowedRoles={['creator', 'user']}>
                    <PersonalPage />
                  </RequireAuth>
                }
              />

              {/* 404 */}
              <Route path='*' element={<NotFound />} />
            </Routes>
          </AppBox>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}

function App() {
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'user',
        }),
      });
      console.log(await response.json());
      return;
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();

  return (
    <ThemeProviderWrapper>
      <AppContent />
    </ThemeProviderWrapper>
  );
}

export default App;
