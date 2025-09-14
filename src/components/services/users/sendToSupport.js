import apiFetch from '../apiFetch';

const sendToSupport = async (data) => {
  return await apiFetch('/api/support/send', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export default sendToSupport;
