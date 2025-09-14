import DefaultTable from './DefaultTable';
const AllUsersTable = ({ columns, rows, setSelectionModel, onRowClick }) => {
  return (
    <DefaultTable
      rows={rows}
      columns={columns}
      setSelectionModel={setSelectionModel}
      onRowClick={onRowClick}
    />
  );
};

export default AllUsersTable;
