import apiFetch from '../../apiFetch';

const getSalesforceId = async (userId) => {
  return await apiFetch(`/api/salesforce/user/${userId}`);
};

export default getSalesforceId;
