import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Typography } from '@mui/material';
import { supabase } from '../../lib/supabaseClient';

const SocialAuth = () => {
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:5173/oauth-redirect"
      },
    });
    if (error) console.error("GitHub login error:", error.message);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
      <Typography>Continue with</Typography>
      <Box
        onClick={handleGitHubLogin}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          padding: "8px 16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <GitHubIcon />
        <Typography fontWeight="bold">GitHub</Typography>
      </Box>
    </Box>
  );
};

export default SocialAuth;
