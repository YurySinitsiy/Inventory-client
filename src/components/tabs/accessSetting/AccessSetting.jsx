import { useEffect, useState } from 'react';
import AllUsersTable from '../../table/AllUsersTable';
import Loader from '../../tools/Loader';
import { Box } from '@mui/material';
import ActionsAccessWrite from '../../actions/ActionsAccessWrite';
import getUsersAccess from '../../services/getUsersAccess';
import { useTranslation } from 'react-i18next';

const accessSetting = ({ inventory }) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [allUsersAccess, setAllUsersAccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const fetchUsersAccess = async () => {
    try {
      setIsLoading(true);
      setAllUsersAccess(await getUsersAccess(inventory.id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAccess();
  }, [inventory]);

  const usersColumns = [
    { field: 'email', headerName: t('auth.email'), flex: 1 },
    { field: 'name', headerName: t('auth.name'), flex: 1 },
    { field: 'surname', headerName: t('auth.surname'), flex: 1 },
    {
      field: 'hasAccess',
      headerName: t('auth.access'),
      flex: 1,
      type: 'boolean',
    },
  ];

  if (isLoading) return <Loader />;
  return (
    <Box>
      <ActionsAccessWrite
        selectedIds={selectionModel}
        loading={isLoading}
        inventoryId={inventory.id}
        setSelectedIds={setSelectionModel}
        fetchUsersAccess={fetchUsersAccess}
      />
      <AllUsersTable
        columns={usersColumns}
        rows={allUsersAccess}
        setSelectionModel={setSelectionModel}
      />
    </Box>
  );
};

export default accessSetting;
