import { Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useSearchParams } from 'react-router-dom';

const IntegrationSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

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
          Интеграция с Salesforce успешна!
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={handleBack}
          sx={{ mt: 3 }}>
          Назад к профилю
        </Button>
      </Paper>
    </Box>
  );
};

export default IntegrationSuccessPage;
