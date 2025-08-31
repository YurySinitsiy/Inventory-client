import { Box } from '@mui/material';
import Loader from '../../tools/Loader';
import SnackbarAlert from '../../tools/Snackbar.jsx';
import { useState, useEffect } from 'react';
import AllUsersTable from '../AllUsersTable';
import ActionsAllUsers from '../../actions/ActionsAllUsers';
import handleDeleteUser from '../../services/handleDeleteUser';
import { useSnackbar } from '../../services/hooks/useSnackbar.jsx';
import getUsers from '../../services/getUsers.js';
import { useTranslation } from 'react-i18next';
import updateUsersData from '../../services/updateUsersData.js';
const RenderUsersTable = () => {
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [selectionModel, setSelectionModel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const usersColumns = [
    { field: 'id', headerName: 'ID', minWidth: 170, flex: 1 },
    { field: 'email', headerName: t('auth.email'), minWidth: 170, flex: 1 },
    { field: 'name', headerName: t('auth.name'), minWidth: 170, flex: 1 },
    { field: 'surname', headerName: t('auth.surname'), minWidth: 170, flex: 1 },
    { field: 'role', headerName: t('auth.role'), minWidth: 170, flex: 1 },
    {
      field: 'status',
      headerName: t('auth.status'),
      minWidth: 170,
      flex: 1,
      renderCell: ({ row }) => (
        <span style={{ color: row.status === 'blocked' ? 'red' : 'green' }}>
          {row.status === 'blocked' ? 'Blocked' : 'Active'}
        </span>
      ),
    },
  ];

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      setUsers(await getUsers());
    } catch (error) {
      console.error('Fetch users error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteSelected = async () => {
    if (!selectionModel.length) return;
    setIsLoading(true);
    try {
      await handleDeleteUser(selectionModel);
      setUsers((prev) =>
        prev.filter((row) => !selectionModel.includes(row.id))
      );
      setSelectionModel([]);
      showSnackbar(t('user.deleted'), 'success');
    } catch (err) {
      showSnackbar(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUsers = async (updates) => {
    if (!selectionModel.length) return;
    setIsLoading(true);
    try {
      await updateUsersData(selectionModel, updates);
      setUsers((prev) =>
        prev.map((user) =>
          selectionModel.includes(user.id) ? { ...user, ...updates } : user
        )
      );
      setSelectionModel([]);
      showSnackbar(t('user.updated'), 'success');
    } catch (error) {
      console.error('Update users status error', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Box>
      <SnackbarAlert snackbar={snackbar} closeSnackbar={closeSnackbar} />

      <ActionsAllUsers
        selectedIds={selectionModel}
        deleteUsers={deleteSelected}
        updateUsers={updateUsers}
      />
      <AllUsersTable
        rows={users}
        setSelectionModel={setSelectionModel}
        columns={usersColumns}
      />
    </Box>
  );
};

export default RenderUsersTable;
