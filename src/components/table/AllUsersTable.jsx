import DefaultTable from './DefaultTable';
const AllUsersTable = ({ columns, rows, setSelectionModel }) => {
  return (
    <DefaultTable
      rows={rows}
      columns={columns}
      setSelectionModel={setSelectionModel}
    />
  );
};

export default AllUsersTable;
