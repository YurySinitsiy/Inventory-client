import apiFetch from '../apiFetch';

const checkUserAccess = (inventoryId, userId) => {
  return apiFetch(
    `/api/inventories/${inventoryId}/access-write/user/${userId}`
  );
};

export default checkUserAccess;
