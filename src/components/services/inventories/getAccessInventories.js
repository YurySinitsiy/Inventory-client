import apiFetch from '../apiFetch.js';

const getAllAccessInventories = async () => {
   return apiFetch('/api/inventories/access-write');
};

export default getAllAccessInventories;
