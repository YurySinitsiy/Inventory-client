import apiFetch from '../apiFetch';

const handleAddItem = async (inventoryId, values) => {
  console.log(values)
  return apiFetch(`/api/inventories/${inventoryId}/items`, {
    method: 'POST',
    body: JSON.stringify( values ),
  });
};

export default handleAddItem;
