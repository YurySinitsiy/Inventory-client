import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ActionsAllUsers = ({ selectedIds, deleteUsers, updateUsers }) => {
  const { t } = useTranslation();
  const disabled = !selectedIds.length;

  const actions = [
    {
      label: t('delete'),
      color: 'error',
      onClick: deleteUsers,
    },
    {
      label: t('unblock'),
      color: 'success',
      onClick: () => updateUsers({ status: 'unblocked' }),
    },
    {
      label: t('block'),
      color: 'error',
      onClick: () => updateUsers({ status: 'blocked' }),
    },
    {
      label: t('admin.role'),
      color: 'secondary',
      onClick: () => updateUsers({ role: 'admin' }),
    },
    {
      label: t('user.role'),
      color: 'primary',
      onClick: () => updateUsers({ role: 'user' }),
    },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {actions.map(({ label, color, onClick }) => (
        <Button
          key={label}
          variant='outlined'
          sx={{ my: 1 }}
          disabled={disabled}
          color={color}
          onClick={onClick}>
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default ActionsAllUsers;
