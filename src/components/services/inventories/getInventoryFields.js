import apiPublicFetch from '../apiPublicFetch';

const getInventoryFields = async (inventoryId) => {
  return apiPublicFetch(`/api/inventories/${inventoryId}/fields`);
};

export default getInventoryFields;
