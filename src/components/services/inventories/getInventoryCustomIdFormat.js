import apiFetch from '../apiFetch';

const getInventoryCustomIdFormat = async (inventoryId) => {
  return apiFetch(`/api/inventories/${inventoryId}/idFormat`);
};

export default getInventoryCustomIdFormat;
