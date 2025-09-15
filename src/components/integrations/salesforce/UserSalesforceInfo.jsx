import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const UserSalesforceInfo = ({ sfData, handleUnlink, unlinking, isOwner }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 3,
        width: '100%',
        flexWrap: 'wrap',
      }}>
      <Box>
        <Typography variant='subtitle1' fontWeight='bold'>
          Account
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Typography variant='body2'>ID: {sfData.accountId}</Typography>
        <Typography variant='body2'>Name: {sfData.accountName}</Typography>
      </Box>

      <Box>
        <Typography variant='subtitle1' fontWeight='bold'>
          Contact
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Typography variant='body2'>ID: {sfData.salesforceId}</Typography>
        <Typography variant='body2'>Phone: {sfData.phone}</Typography>
        <Typography variant='body2'>Email: {sfData.email}</Typography>
      </Box>

      {isOwner && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
          }}>
          <Button
            variant='outlined'
            color='error'
            onClick={handleUnlink}
            disabled={unlinking}>
            {unlinking ? <CircularProgress size={20} /> : t('account.remove')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UserSalesforceInfo;
