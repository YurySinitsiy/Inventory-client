import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from "../tools/Checkbox";

const AllUsersTable = ({ usersColumns, rows, selectedIds, setSelectedIds }) => {
  const selectionColumn = Checkbox({
    rows,
    selectedIds,
    setSelectedIds,
  });

  const columns = [selectionColumn, ...usersColumns];
  console.log(columns);
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10]}
        checkboxSelection={false}
        autoHeight
        sx={{ border: 0 }}
        rowSelection={false}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
      />
    </Paper>
  );
};

export default AllUsersTable;
