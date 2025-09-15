import apiFetch from '../../apiFetch';

const getSalesforceData = async (userId) => {
  return await apiFetch(`/api/salesforce/user/${userId}`);
};

export default getSalesforceData;
