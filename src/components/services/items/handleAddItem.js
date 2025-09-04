import apiFetch from '../apiFetch';

const handleAddItem = async (inventoryId, values) => {
  return apiFetch(`/api/inventories/${inventoryId}/items`, {
    method: 'POST',
    body: JSON.stringify( values ),
  });
};

export default handleAddItem;
