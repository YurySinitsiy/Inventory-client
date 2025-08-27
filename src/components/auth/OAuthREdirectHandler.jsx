import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../tools/Loader';
import { getSession } from '../services/getSession';
import upsertUser from '../services/upsertUser';
import checkUserRole from './CheckUserRole';
import RedirectByRole from './RedirectByRole';

const parseName = (fullName = '') => {
  const [name, ...surnameParts] = fullName.split(' ');
  return { name, surname: surnameParts.join(' ') };
};

const saveProfile = async (user) => {
  const { name, surname } = parseName(user.user_metadata?.full_name);
  await upsertUser(user.id, { name, surname, email: user.email });
};

const handleRedirect = async (user, navigate) => {
  await saveProfile(user);
  const role = (await checkUserRole(user.id)) || 'user';
  RedirectByRole(role, navigate);
};

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      try {
        const session = await getSession();
        if (!session?.user) return navigate('/login');
        await handleRedirect(session.user, navigate);
      } catch (err) {
        console.error('OAuth error:', err);
        navigate('/login');
      }
    };
    run();
  }, [navigate]);

  return <Loader />;
};

export default OAuthRedirectHandler;
