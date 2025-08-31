import apiFetch from './apiFetch.js';

const getAllPublicInventories = async () => {
  return apiFetch(`/api/public-inventories`);
};

export default getAllPublicInventories;
