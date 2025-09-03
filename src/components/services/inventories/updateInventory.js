import apiFetch from '../apiFetch';

const updateInventory = async (inventoryId, data) => {
  return apiFetch(`/api/inventories/${inventoryId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export default updateInventory;
