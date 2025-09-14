import { Box } from '@mui/material';
import getUserInventories from '../services/inventories/getUserInventories';
import { useState, useEffect } from 'react';
import Loader from '../tools/Loader.jsx';
import DeleteInventoryButton from '../actions/DeleteInventoryButton';
import AddInventoryButton from '../actions/AddInventoryButton';
import InventoriesContainer from './InventoriesContainer';
import { useSnackbar } from '../context/SnackbarContext.jsx';
const UserInventories = () => {
  const [userInventories, setUserInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const { showSnackbar } = useSnackbar();

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
        />
        <DeleteInventoryButton
          disabled={!selectionModel.length}
          onClick={deleteSelected}
        />
      </Box>
    );
  };

  if (isLoading) return <Loader />;

  return (
    <Box>
      <InventoriesContainer
        inventories={userInventories}
        setSelectionModel={setSelectionModel}
        actions={userInventoriesActions}
        selectionModel={selectionModel}
        setUserInventories={setUserInventories}
        showSnackbar={showSnackbar}
      />
    </Box>
  );
};

export default UserInventories;
