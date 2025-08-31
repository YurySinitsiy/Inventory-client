import Loader from '../tools/Loader';
import { useNavigate } from 'react-router-dom';
import getColumns from './InventoriesColumns';
import DefaultTable from './DefaultTable';
const InventoryTable = ({ inventories = [], setSelectionModel }) => {
  const navigate = useNavigate();

  if (!inventories) return <Loader />;

  const columns = getColumns();

  return (
    <DefaultTable
      rows={inventories}
      columns={columns}
      setSelectionModel={setSelectionModel}
      onRowClick={(params) => navigate(`/inventory/${params.id}`)}
    />
  );
};

export default InventoryTable;
