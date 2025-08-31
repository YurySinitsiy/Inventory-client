import apiFetch from './apiFetch';

const updateUsersData = async (ids, updates) => {
  return apiFetch('/api/users/update', {
    method: 'PATCH',
    body: JSON.stringify({ ids, ...updates }),
  });
};

export default updateUsersData;
