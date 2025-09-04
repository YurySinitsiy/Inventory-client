import { Box, Typography, ButtonBase } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { supabase } from '../../lib/supabaseClient';
import { useTranslation } from 'react-i18next';

const SocialAuth = () => {
  const { t } = useTranslation();
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

  const redirectUrl =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5173/oauth-redirect'
      : `https://inventory-client-lac.vercel.app//oauth-redirect`;

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectUrl },
    });

    if (error) console.error(`${provider} login error:`, error.message);
  };

  const providers = [
    { name: 'GitHub', icon: <GitHubIcon />, id: 'github' },
    { name: 'Google', icon: <GoogleIcon />, id: 'google' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography textAlign='center'>{t('continue.with')}</Typography>
      {providers.map((p) => (
        <ButtonBase
          key={p.id}
          onClick={() => handleOAuthLogin(p.id)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            transition: 'background-color 0.3s',
            '&:hover': { backgroundColor: '#1976d2', color: '#fff' },
          }}>
          {p.icon}
          <Typography fontWeight='bold'>{p.name}</Typography>
        </ButtonBase>
      ))}
    </Box>
  );
};

export default SocialAuth;
