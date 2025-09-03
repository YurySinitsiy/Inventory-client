import { Box, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { supabase } from '../../lib/supabaseClient';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL;

const style = {
  display: 'flex',
  gap: 1,
  cursor: 'pointer',
  padding: '8px 16px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
};

const SocialAuth = () => {
  const { t } = useTranslation();

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      //options: { redirectTo: `https://inventory-client-lac.vercel.app/oauth-redirect` },
      options: { redirectTo: `http://localhost:5173/oauth-redirect` },
    });

    if (error) console.error(`${provider} login error:`, error.message);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography textAlign='center'>{t('continue.with')}</Typography>
      <Box onClick={() => handleOAuthLogin('github')} sx={style}>
        <GitHubIcon />
        <Typography fontWeight='bold'>GitHub</Typography>
      </Box>
      <Box onClick={() => handleOAuthLogin('google')} sx={style}>
        <GoogleIcon />
        <Typography fontWeight='bold'>Google</Typography>
      </Box>
    </Box>
  );
};

export default SocialAuth;
