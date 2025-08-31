import { DataGrid } from '@mui/x-data-grid';

const DefaultTable = ({ rows, columns, setSelectionModel, onRowClick }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSizeOptions={[10]}
      autoHeight
      sx={{ border: 0 }}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
      checkboxSelection
      onRowSelectionModelChange={(newSelection) => {
        setSelectionModel(Array.from(newSelection.ids));
      }}
      onRowClick={onRowClick}
    />
  );
};

export default DefaultTable;
