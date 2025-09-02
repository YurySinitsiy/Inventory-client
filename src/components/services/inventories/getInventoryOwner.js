import apiFetch from '../apiFetch';

const getInventoryTags = async (inventoryId) => {
  return apiFetch(`/api/inventories/${inventoryId}/owner`);
};

export default getInventoryTags;
