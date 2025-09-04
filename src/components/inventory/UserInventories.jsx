import { Box } from '@mui/material';
import getUserInventories from '../services/inventories/getUserInventories';
import { useState, useEffect } from 'react';
import Loader from '../tools/Loader.jsx';
import DeleteInventoryButton from '../actions/DeleteInventoryButton';
import AddInventoryButton from '../actions/AddInventoryButton';
import InventoriesContainer from './InventoriesContainer';
import { useSnackbar } from '../services/hooks/useSnackbar';
import SnackbarAlert from '../tools/Snackbar';

const UserInventories = ({t}) => {
  const [userInventories, setUserInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const fetchUserInventories = async () => {
    setIsLoading(true);
    try {
      const data = await getUserInventories();
      setUserInventories(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInventories();
  }, []);

  const userInventoriesActions = ({ deleteSelected }) => {
    return (
      <Box>
        <AddInventoryButton
          setUserInventories={setUserInventories}
          showSnackbar={showSnackbar}
          t={t}
        />
        <DeleteInventoryButton
          disabled={!selectionModel.length}
          onClick={deleteSelected}
          t={t}
        />
      </Box>
    );
  };

  if (isLoading) return <Loader />;

  return (
    <Box>
      <SnackbarAlert snackbar={snackbar} closeSnackbar={closeSnackbar} />

      <InventoriesContainer
        inventories={userInventories}
        setSelectionModel={setSelectionModel}
        actions={userInventoriesActions}
        selectionModel={selectionModel}
        setUserInventories={setUserInventories}
        showSnackbar={showSnackbar}
        t={t}
      />
    </Box>
  );
};

export default UserInventories;
