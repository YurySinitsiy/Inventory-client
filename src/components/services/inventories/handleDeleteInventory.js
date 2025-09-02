import apiFetch from '../apiFetch.js';

const handleDeleteInventory = async (selectedIds) => {
  return apiFetch('/api/inventories', {
    method: 'DELETE',
    body: JSON.stringify({ ids: selectedIds }),
  });
};

export default handleDeleteInventory;
