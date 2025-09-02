import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../tools/Loader';
import apiFetch from '../services/apiFetch';
import  RedirectByRole  from './RedirectByRole.js';
import { getSession } from '../services/users/getSession';
const OAuthRedirectHandler = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const session = await getSession();
      if (!session?.user) {
        navigate('/login');
        return;
      }
      try {
        const data = await apiFetch('/api/auth/social-login', {
          method: 'PUT',
          body: JSON.stringify({ user: session.user }),
        });
        console.log(session.user);
        RedirectByRole(data.role, navigate);
      } catch (err) {
        console.error('OAuth error:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [navigate]);

  if (loading) return <Loader />;
  return null;
};

export default OAuthRedirectHandler;
