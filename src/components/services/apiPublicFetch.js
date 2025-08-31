const API_URL = import.meta.env.VITE_API_URL;

const apiPublicFetch = async (path, options = {}) => {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Server error: ${res.status}`);
  }
  return res.json();
};

export default apiPublicFetch;
