import { useState } from 'react';
import Loader from '../components/tools/Loader';
import Title from '../components/tools/Title';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import { supabase } from '../lib/supabaseClient';
import RedirectByRole from '../components/auth/RedirectByRole';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../components/tools/Snackbar';
import { useSnackbar } from '../components/services/hooks/useSnackbar';
import SocialAuth from '../components/auth/SocialAuth';
import { useTranslation } from 'react-i18next';
import getUser from '../components/services/users/getUser';

const RenderLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword(values);
      if (error) throw error;
      const me = await getUser();
      afterLogin(me, resetForm);
    } catch (err) {
      showSnackbar(err.message || t('auth.loginFailed'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const afterLogin = (me, resetForm) => {
    resetForm();
    setRedirecting(true);
    RedirectByRole(me.role, navigate);
  };

  if (isLoading || redirecting) return <Loader />;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'calc(100% - 64px)',
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
  );
};

export default RenderLoginPage;
