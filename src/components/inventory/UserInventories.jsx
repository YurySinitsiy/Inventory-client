import { Box } from '@mui/material';
import getUserInventories from '../services/inventories/getUserInventories.js';
import { useState, useEffect } from 'react';
import Loader from '../tools/Loader.jsx';
import DeleteInventoryButton from '../actions/DeleteInventoryButton.jsx';
import AddInventoryButton from '../actions/AddInventoryButton.jsx';
import InventoriesContainer from './InventoriesContainer.jsx';
const UserInventories = () => {
  const [userInventories, setUserInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [message, setMessage] = useState('');

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
          setMessage={setMessage}
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
        message={message}
      />
    </Box>
  );
};

export default UserInventories;
