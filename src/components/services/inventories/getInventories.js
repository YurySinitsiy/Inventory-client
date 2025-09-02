import apiPublicFetch from '../apiPublicFetch.js';

const getInventories = async () => {
  return apiPublicFetch('/api/inventories/all');
};

export default getInventories;
