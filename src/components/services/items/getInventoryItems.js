import apiPublicFetch from '../apiPublicFetch';

const getInventoryItems = async (inventoryId) => {
  return apiPublicFetch(`/api/inventories/${inventoryId}/items`);
};

export default getInventoryItems