import { getSession } from './getSession';

const API_URL = import.meta.env.VITE_API_URL;

const sendToSupport = async (data) => {
  try {
    const session = await getSession();
    if (!session) throw new Error('You must be logged in to send a message');
    const res = await fetch(`${API_URL}/api/support/send`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to send message');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default sendToSupport;
