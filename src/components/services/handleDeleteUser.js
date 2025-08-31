import apiFetch from '../services/apiFetch';

const handleDeleteUser = async (selectedIds) => {
  return apiFetch('/api/users', {
    method: 'DELETE',
    body: JSON.stringify({ ids: selectedIds }),
  });
};

export default handleDeleteUser;
