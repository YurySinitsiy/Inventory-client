import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import Loader from '../tools/Loader';
import RedirectByRole from './RedirectByRole';
import socialLogin from '../services/users/socialLogin';

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getSessionFromUrl({
          storeSession: true,
        });
        if (error || !data.session?.user) {
          console.error('OAuth error:', error?.message);
          navigate('/login');
          return;
        }

        const session = data.session;
        const userData = await socialLogin(session.user);
        RedirectByRole(userData.role, navigate);
      } catch (err) {
        console.error('OAuth processing error:', err);
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
