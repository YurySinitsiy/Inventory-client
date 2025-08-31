import apiPublicFetch from './apiPublicFetch.js';

const getInventories = async () => {
  return apiPublicFetch('/api/all-inventories');
};

export default getInventories;
