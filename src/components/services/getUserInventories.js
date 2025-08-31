import apiFetch from './apiFetch.js';

const getUserInventories = () => {
  return apiFetch('/api/inventories/my');
};

export default getUserInventories;
