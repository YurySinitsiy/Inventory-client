import AppBox from '../components/tools/AppBox';
import { useState, useEffect } from 'react';
import Loader from '../components/tools/Loader';
import Title from '../components/tools/Title';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link, Alert } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import { supabase } from '../lib/supabaseClient';
import CheckUserStatus from '../components/auth/CheckUserStatus';
import CheckUserRole from '../components/auth/CheckUserRole';
import RedirectByRole from '../components/auth/RedirectByRole';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../components/tools/Snackbar';
import { useSnackbar } from '../components/services/hooks/useSnackbar';
import SocialAuth from '../components/auth/SocialAuth';
import { useTranslation } from 'react-i18next';

const RenderLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (authError) throw authError;

      const isUserValid = await CheckUserStatus(user.id);
      if (!isUserValid) {
        throw new Error(t('auth.block'));
      }
      resetForm();
      setRedirecting(true);
      RedirectByRole(await CheckUserRole(user.id), navigate);
    } catch (error) {
      showSnackbar(error.message || 'Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || redirecting) return <Loader />;

  return (
    <AppBox>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}>
        <SnackbarAlert snackbar={snackbar} closeSnackbar={closeSnackbar} />
        <Title variant='h4' sx={{ marginBottom: '30px', fontWeight: '700' }}>
          {t('welcome.to')} Invy!
        </Title>
        <LoginForm onSubmit={handleSubmit} />
        <Box textAlign='center' mt={3} mb={2}>
          <Typography
            variant='body2'
            sx={{
              display: 'flex',
              gap: 1,
            }}>
            {t('auth.account.not')}
            <Link
              component={RouterLink}
              to='/signup'
              underline='hover'
              fontWeight='bold'>
              {t('nav.signup')}
            </Link>
          </Typography>
        </Box>
        <SocialAuth />
      </Box>
    </AppBox>
  );
};

export default RenderLoginPage;
