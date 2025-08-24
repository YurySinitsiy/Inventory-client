import { DataGrid } from "@mui/x-data-grid";
import Loader from "../tools/Loader";
import { useNavigate } from "react-router-dom";
import inventoriesColumns from "./InventoriesColumns";
import Checkbox from "../tools/Checkbox";
const InventoryTable = ({
  inventories = [],
  enotherColumns,
  selectedIds = [],
  setSelectedIds = () => {},
}) => {
  const navigate = useNavigate();

  if (!inventories) return <Loader />;

  const selectionColumn = Checkbox({
    row: inventories,
    selectedIds,
    setSelectedIds,
  });

  const columns = [selectionColumn, ...inventoriesColumns];

  return (
    <DataGrid
      rows={inventories}
      columns={enotherColumns || columns}
      pageSizeOptions={[10]}
      checkboxSelection={false}
      //getRowHeight={() => 'auto'}
      sx={{ border: 0 }}
      rowSelection={false}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
      onRowClick={(params) => navigate(`/inventory/${params.id}`)}
      autoHeight
    />
  );
};

export default InventoryTable;
