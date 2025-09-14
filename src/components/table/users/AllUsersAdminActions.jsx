import { Box } from '@mui/material';
import Loader from '../../tools/Loader';
import SnackbarAlert from '../../tools/Snackbar';
import { useState, useEffect } from 'react';
import AllUsersTable from '../AllUsersTable';
import ActionsAllUsers from '../../actions/ActionsAllUsers';
import handleDeleteUser from '../../services/users/handleDeleteUser';
import { useSnackbar } from '../../services/hooks/useSnackbar';
import getUsers from '../../services/users/getUsers';
import updateUsersData from '../../services/users/updateUsersData';
import UsersColumns from './UsersColumns';
import { useNavigate } from 'react-router-dom';
const AllUsersAdminActions = ({ t }) => {
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const [selectionModel, setSelectionModel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const usersColumns = UsersColumns({ t });
  const navigate = useNavigate();

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

  const startDeleteUser = async () => {
    await handleDeleteUser(selectionModel);
    setUsers((prev) => prev.filter((row) => !selectionModel.includes(row.id)));
    setSelectionModel([]);
    showSnackbar(t('user.deleted'), 'success');
  };

  const deleteSelected = async () => {
    if (!selectionModel.length) return;
    setIsLoading(true);
    try {
      await startDeleteUser();
    } catch (err) {
      showSnackbar(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const startUpdateusers = async (updates) => {
    await updateUsersData(selectionModel, updates);
    setUsers((prev) =>
      prev.map((user) =>
        selectionModel.includes(user.id) ? { ...user, ...updates } : user
      )
    );
    setSelectionModel([]);
    showSnackbar(t('user.updated'), 'success');
  };

  const updateUsers = async (updates) => {
    if (!selectionModel.length) return;
    setIsLoading(true);
    try {
      await startUpdateusers(updates);
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
        onRowClick={(row) => {
          navigate(`/users/${row.id}`);
        }}
      />
    </Box>
  );
};

export default AllUsersAdminActions;
