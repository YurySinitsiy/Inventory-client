import apiFetch from '../apiFetch';

const getInventoryTags = async (inventoryId) => {
  return apiFetch(`/api/inventories/${inventoryId}/tags`);
};

export default getInventoryTags;
