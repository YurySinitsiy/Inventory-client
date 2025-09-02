import apiPublicFetch from '../apiPublicFetch.js';

const getInventory = async (id) => {
  return apiPublicFetch(`/api/inventories/${id}`);
};

export default getInventory;
