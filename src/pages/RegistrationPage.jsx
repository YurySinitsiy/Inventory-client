import RegForm from '../components/auth/RegForm';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import { supabase } from '../lib/supabaseClient';
import { useState } from 'react';
import SnackbarAlert from '../components/tools/Snackbar';
import { useSnackbar } from '../components/services/hooks/useSnackbar';
import SocialAuth from '../components/auth/SocialAuth';
import { useTranslation } from 'react-i18next';
import handleRegistration from '../components/services/users/handleRegistration';
const RegistrationPage = () => {
  const navigate = useNavigate();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const signUpUser = async (values) => {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: { data: { name: values.name, surname: values.surname } },
    });
    if (error) throw error;
    return data;
  };

  const handlesubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const authData = await signUpUser(values);
      await handleRegistration(authData, values);
      showSnackbar(t('reg.ok'), 'success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      showSnackbar(error.message || t('reg.err'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'calc(100% - 64px)',
        paddingBlock: '200px'
      }}>
      <SnackbarAlert snackbar={snackbar} closeSnackbar={closeSnackbar} />
      <RegForm onSubmit={handlesubmit} isSubmitting={isSubmitting} t={t} />
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
  );
};

export default RegistrationPage;
