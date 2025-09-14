import { Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const IntegrationSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { t } = useTranslation();
  const handleBack = () => {
    navigate(`/users/${id}`);
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='calc(100vh - 64px)'>
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', width: 400 }}>
        <CheckCircleOutlineIcon color='success' sx={{ fontSize: 60 }} />
        <Typography variant='h5' mt={2} gutterBottom>
          {t('connection.success')}
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={handleBack}
          sx={{ mt: 3 }}>
          {t('back.to.profile')}
        </Button>
      </Paper>
    </Box>
  );
};

export default IntegrationSuccessPage;
