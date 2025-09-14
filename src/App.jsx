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
import { useContext } from 'react';
import {
  ThemeProviderWrapper,
  ThemeContext,
} from './components/tools/ThemeContext';
import OAuthRedirectHandler from './components/auth/OAuthREdirectHandler';
import AppBar from './components/tools/AppBar';
import AppBox from './components/tools/AppBox';
import UserPage from './pages/UserPage';
import IntegrationSuccessPage from './pages/IntegrationSuccessPage';
import SupportButton from './components/support/SupportButton';
import { UserProvider } from './components/auth/UserContext';
import { InventoryProvider } from './components/inventory/InventoryContext';
function AppContent() {
  const { darkMode } = useContext(ThemeContext);

  const theme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBox>
          <AppBar />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<RegistrationPage />} />
            <Route path='/inventory/:id' element={<InventoryPage />} />
            <Route path='/oauth-redirect' element={<OAuthRedirectHandler />} />
            <Route
              path='/admin'
              element={
                <RequireAuth allowedRoles={['admin']}>
                  <AdminPage />
                </RequireAuth>
              }
            />
            <Route
              path='/personal'
              element={
                <RequireAuth allowedRoles={['user']}>
                  <PersonalPage />
                </RequireAuth>
              }
            />

            <Route
              path='/users/:id'
              element={
                <RequireAuth allowedRoles={['admin', 'user']}>
                  <UserPage />
                </RequireAuth>
              }
            />

            <Route
              path='/salesforce/success'
              element={
                <RequireAuth allowedRoles={['admin', 'user']}>
                  <IntegrationSuccessPage />
                </RequireAuth>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <SupportButton />
        </AppBox>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeProviderWrapper>
      <UserProvider>
        <InventoryProvider>
          <AppContent />
        </InventoryProvider>
      </UserProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
