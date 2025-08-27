import InventoryTable from '../table/InventoryTable.jsx';
import { useInventories } from '../services/hooks/useInventories.js';
import Loader from '../tools/Loader.jsx';
import { Paper } from '@mui/material';
import getColumns from '../table/InventoriesColumns.jsx';

const RenderAllUsersInventories = () => {
  const { inventories, isLoading } = useInventories();

  const columns = getColumns();
  if (isLoading) return <Loader />;

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <InventoryTable
        inventories={inventories || []}
        enotherColumns={columns}
      />
    </Paper>
  );
};

export default RenderAllUsersInventories;
