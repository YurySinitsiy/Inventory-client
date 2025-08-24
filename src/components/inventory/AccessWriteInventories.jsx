import InventoryTable from "../table/InventoryTable.jsx";
import { useInventories } from "../services/hooks/useInventories.js";
import Loader from "../tools/Loader.jsx";
import { Paper } from "@mui/material";
import inventoriesColumns from "../table/InventoriesColumns.jsx";

const AccessWriteInventories = () => {
  const { allPublicInventories, allWriteAccessInventories, isLoading } =
    useInventories();
  const allInventories = [
    ...allPublicInventories,
    ...allWriteAccessInventories,
  ];
  const columns = inventoriesColumns;
  if (isLoading) return <Loader />;

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <InventoryTable
        inventories={allInventories || []}
        enotherColumns={columns}
      />
    </Paper>
  );
};

export default AccessWriteInventories;
