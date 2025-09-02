import apiFetch from '../apiFetch.js';

const getAllPublicInventories = async () => {
  return apiFetch(`/api/inventories/public`);
};

export default getAllPublicInventories;
