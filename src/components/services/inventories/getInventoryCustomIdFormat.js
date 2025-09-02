import apiPublicFetch from '../apiPublicFetch';

const getInventoryCustomIdFormat = async (inventoryId) => {
  return apiPublicFetch(`/api/inventories/${inventoryId}/idFormat`);
};

export default getInventoryCustomIdFormat;
