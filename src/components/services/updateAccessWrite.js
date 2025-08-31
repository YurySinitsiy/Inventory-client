import apiFetch from './apiFetch';

const updateAccessWrite = async (giveAccess, inventoryId, selectedIds) => {
  const users = selectedIds.map((id) => ({
    userId: id,
    hasAccess: giveAccess,
  }));

  return apiFetch(`/api/users/${inventoryId}/users-access/bulk`, {
    method: 'POST',
    body: JSON.stringify({ users }),
  });
};

export default updateAccessWrite;
