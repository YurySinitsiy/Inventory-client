import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
const UserSalesforceInfo = ({ salesforceId, handleUnlink, unlinking }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
      }}>
      <Typography color='primary' >
        <a
          href={`https://orgfarm-be6c10ad92-dev-ed.develop.lightning.force.com/${salesforceId}`}
          target='_blank'
          rel='noopener noreferrer'>
          {t('account.view')}
        </a>
      </Typography>
      <Button
        variant='outlined'
        color='error'
        onClick={handleUnlink}
        disabled={unlinking}>
        {unlinking ? <CircularProgress size={20} /> : t('account.remove')}
      </Button>
    </Box>
  );
};

export default UserSalesforceInfo;
