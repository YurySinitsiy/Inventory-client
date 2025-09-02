import { Box, Button } from '@mui/material';
import updateAccessWrite from '../services/users/updateAccessWrite';
import Loader from '../tools/Loader';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ActionsAccessWrite = ({
  selectedIds,
  inventoryId,
  loading,
  fetchUsersAccess,
  setSelectedIds,
}) => {
  const [updating, setUpdating] = useState(false);
  const { t } = useTranslation();

  if (!inventoryId) return null;

  const updateAccess = async (giveAccess) => {
    setUpdating(true);
    try {
      await updateAccessWrite(giveAccess, inventoryId, selectedIds);
      setSelectedIds([]);
      await fetchUsersAccess(inventoryId);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };
  if (loading || updating) return <Loader />;

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        variant='outlined'
        sx={{ my: 1 }}
        disabled={!selectedIds.length}
        color='success'
        onClick={() => updateAccess(true)}>
        {t('access.give')}
      </Button>
      <Button
        variant='outlined'
        sx={{ my: 1 }}
        disabled={!selectedIds.length}
        color='error'
        onClick={() => updateAccess(false)}>
        {t('access.remove')}
      </Button>
    </Box>
  );
};

export default ActionsAccessWrite;
