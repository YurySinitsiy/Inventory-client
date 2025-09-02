import { getSession } from './users/getSession';
import { supabase } from '../../lib/supabaseClient';
const API_URL = import.meta.env.VITE_API_URL;
const apiFetch = async (path, options = {}) => {
  const session = await getSession();
  if (!session) return;
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      if (path === '/api/users/me') {
        throw new Error('Account has been blocked or delete');
      } else {
        await supabase.auth.signOut(); // выходим из системы
        window.location.href = '/login';
      }
    }

    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Server error: ${res.status}`);
  }
  return res.json();
};

export default apiFetch;
