import Loader from '../tools/Loader';
import { useState, useEffect } from 'react';
import getInventories from '../services/inventories/getInventories';
import DeleteButton from '../actions/DeleteInventoryButton';
import InventoriesContainer from './InventoriesContainer';
import { useTranslation } from 'react-i18next';

const AllUsersInventories = ({ checkboxSelection, isAdmin = false }) => {
  const { t } = useTranslation();
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

  const renderActions = ({ deleteSelected }) => {
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
      actions={renderActions}
      selectionModel={selectionModel}
      setUserInventories={setAllInventories}
      checkboxSelection={checkboxSelection}
    />
  );
};

export default AllUsersInventories;
