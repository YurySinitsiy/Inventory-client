import Loader from '../tools/Loader.jsx';
import { useState, useEffect } from 'react';
import getInventories from '../services/inventories/getInventories.js';
import DeleteButton from '../actions/DeleteInventoryButton.jsx';
import InventoriesContainer from './InventoriesContainer.jsx';

const AllUsersInventories = ({ checkboxSelection, isAdmin = false }) => {
  const [allInventories, setAllInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);

  const fetchInventories = async () => {
    setIsLoading(true);
    try {
      const data = await getInventories();
      setAllInventories(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  const allUsersInventoriesActions = ({ deleteSelected }) => {
    return (
      isAdmin && (
        <DeleteButton
          disabled={!selectionModel.length}
          onClick={deleteSelected}
        />
      )
    );
  };

  if (isLoading) return <Loader />;

  return (
    <InventoriesContainer
      inventories={allInventories}
      setSelectionModel={setSelectionModel}
      actions={allUsersInventoriesActions}
      selectionModel={selectionModel}
      setUserInventories={setAllInventories}
      checkboxSelection={checkboxSelection}
    />
  );
};

export default AllUsersInventories;
