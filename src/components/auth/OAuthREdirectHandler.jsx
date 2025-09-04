import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../tools/Loader';
import RedirectByRole from './RedirectByRole';
import { getSession } from '../services/users/getSession';
import socialLogin from '../services/users/socialLogin';
import { supabase } from '../../lib/supabaseClient';

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Считать токен из hash
      const hash = new URLSearchParams(window.location.hash.replace('#', '?'));
      const access_token = hash.get('access_token');
      const refresh_token = hash.get('refresh_token');

      if (access_token) {
        // Установить сессию в Supabase
        await supabase.auth.setSession({ access_token, refresh_token });
      }

      const session = await getSession();

      if (!session?.user) {
        navigate('/login');
        return;
      }

      try {
        const data = await socialLogin(session);
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
