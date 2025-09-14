import apiFetch from '../../apiFetch';

const salesforceUnlink = async (userId) => {
  return await apiFetch(`/api/salesforce/unlink`, {
    method: 'PATCH',
    body: JSON.stringify({ id: userId }),
  });
};

export default salesforceUnlink;
