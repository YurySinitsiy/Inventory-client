import apiFetch from '../apiFetch.js';

const getUsersAccess = async (inventoryId) => {
  return apiFetch(`/api/users/${inventoryId}/users-access`);
};

export default getUsersAccess;
