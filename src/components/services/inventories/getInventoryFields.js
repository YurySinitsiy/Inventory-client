import apiFetch from '../apiFetch';

const getInventoryFields = async (inventoryId) => {
  return apiFetch(`/api/inventories/${inventoryId}/fields`);
};

export default getInventoryFields;
