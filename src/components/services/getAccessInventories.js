import apiFetch from './apiFetch.js';

const getAllAccessInventories = async () => {
  return apiFetch('/api/all-access-write-inventories');
};

export default getAllAccessInventories;
