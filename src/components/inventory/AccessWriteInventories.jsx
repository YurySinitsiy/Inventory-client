import { useState, useEffect } from 'react';
import InventoryTable from '../table/InventoryTable';
import Loader from '../tools/Loader';
import getAllPublicInventories from '../services/inventories/getAllPublicInventories';
import getAllAccessInventories from '../services/inventories/getAccessInventories';
const AccessWriteInventories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allPublicInventories, setAllPublicInventories] = useState([]);
  const [allAccessInventories, setAllAccessInventories] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [allPubInv, allAcsInv] = await Promise.all([
        getAllPublicInventories(),
        getAllAccessInventories(),
      ]);
      setAllPublicInventories(allPubInv);
      setAllAccessInventories(allAcsInv);
    } catch (error) {
      console.error('Fetch All public inventories error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allInventories = [
    ...allPublicInventories,
    ...allAccessInventories.filter(
      (a) => !allPublicInventories.some((p) => p.id === a.id)
    ),
  ];
  if (isLoading) return <Loader />;

  return (
    <InventoryTable
      inventories={allInventories || []}
      setSelectionModel={setSelectionModel}
      selectionModel={selectionModel}
      checkboxSelection={false}
    />
  );
};

export default AccessWriteInventories;
