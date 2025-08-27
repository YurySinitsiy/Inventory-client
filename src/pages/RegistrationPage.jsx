import AppBox from '../components/tools/AppBox';
import RegForm from '../components/auth/RegForm';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link, Alert } from '@mui/material';
import { supabase } from '../lib/supabaseClient';
import { useState } from 'react';
import SnackbarAlert from '../components/tools/Snackbar';
import { useSnackbar } from '../components/services/hooks/useSnackbar';
import SocialAuth from '../components/auth/SocialAuth';
import upsertUser from '../components/services/upsertUser';
import { useTranslation } from 'react-i18next';

const RenderRegistrationPage = () => {
  const navigate = useNavigate();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handlesubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const { data: authData, error: Error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            surname: values.surname,
          },
        },
      });
      if (Error) throw Error;

      upsertUser(authData.user.id, values);
      showSnackbar(t('reg.ok'), 'success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      showSnackbar(error.message || t('reg.err'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <RegForm onSubmit={handlesubmit} isSubmitting={isSubmitting} />
        <Box textAlign='center' mt={3}>
          <Typography
            variant='body2'
            mb={2}
            sx={{
              display: 'flex',
              gap: 1,
            }}>
            {t('auth.account.have')}
            <Link
              component={RouterLink}
              to='/login'
              underline='hover'
              fontWeight='bold'>
              {t('auth.login')}
            </Link>
          </Typography>
        </Box>
        <SocialAuth />
      </Box>
    </AppBox>
  );
};

export default RenderRegistrationPage;
