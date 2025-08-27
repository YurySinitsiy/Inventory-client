import { supabase } from '../../lib/supabaseClient';

const upsertUser = async (id, data) => {
  const { name, surname, email } = data;
  const { error: dbError } = await supabase.from('profiles').upsert({
    id: id,
    name: name || null,
    surname: surname || null,
    email: email || null,
    role: 'user',
    status: 'unblocked',
  });

  if (dbError) console.error('DB error:', dbError.message);
};

export default upsertUser;
