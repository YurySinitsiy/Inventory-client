import apiFetch from './apiFetch.js';

const getUserInventories = () => {
  return apiFetch('/api/my-inventories');
};

export default getUserInventories;
