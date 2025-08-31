import apiFetch from './apiFetch.js';

const getUsersAccess = async (inventoryId) => {
  return apiFetch(`/api/inventories/${inventoryId}/users-access`);
};

export default getUsersAccess;
