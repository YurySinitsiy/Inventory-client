import apiFetch from '../apiFetch';

const getInventoryItems = async (inventoryId) => {
  return apiFetch(`/api/inventories/${inventoryId}/items`);
};

export default getInventoryItems