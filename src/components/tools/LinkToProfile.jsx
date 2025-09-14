import { Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const LinkToProfile = ({ userId }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
      <Button
        variant='contained'
        sx={{ margin: '30px', fontWeight: '700' }}
        onClick={() => navigate(`/users/${userId}`)}>
        {t('profiles.my')}
      </Button>
    </Box>
  );
};

export default LinkToProfile;
