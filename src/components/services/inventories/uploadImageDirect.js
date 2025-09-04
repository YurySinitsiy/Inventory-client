 const uploadImageDirect = async (formData) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const res = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed: ${text}`);
  }

  return res.json();
};

export default uploadImageDirect