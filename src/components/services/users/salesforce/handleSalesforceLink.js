import apiFetch from '../../apiFetch';

const handleSalesforceLink = (data) => {
  return apiFetch('/api/salesforce/start', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export default handleSalesforceLink;
