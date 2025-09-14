import { Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const UserOdooInfo = ({ token }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!token) return;
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

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
      <Typography
        color='primary'
        sx={{ wordBreak: 'break-all', cursor: 'pointer' }}
        onClick={handleCopy}>
        {token || t('token.no')}
      </Typography>
      <Button variant='outlined' size='small' onClick={handleCopy} disabled={copied}>
        {copied ? t('copied') : t('copy')}
      </Button>
    </Box>
  );
};

export default UserOdooInfo;
