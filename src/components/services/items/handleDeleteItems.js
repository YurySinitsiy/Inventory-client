import apiFetch from '../apiFetch.js';

const handleDeleteItems = async (inventoryId, selectionModel) => {
  return apiFetch(`/api/inventories/${inventoryId}/items`, {
    method: 'DELETE',
    body: JSON.stringify({ ids: selectionModel }),
  });
};

export default handleDeleteItems;
