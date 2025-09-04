import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../tools/Loader';
import RedirectByRole from './RedirectByRole';
import { getSession } from '../services/users/getSession';
import socialLogin from '../services/users/socialLogin';
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
