import apiFetch from '../apiFetch';

const handleImageUpload = (formData) => {
  return apiFetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
};

export default handleImageUpload;
