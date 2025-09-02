import apiFetch from '../apiFetch';
import { getSession } from '../users/getSession';

const handleAddInventory = async (values) => {
  const session = await getSession();
  const userId = session.user.id;

  return apiFetch('/api/inventories', {
    method: 'POST',
    body: JSON.stringify({
      title: values.title,
      description: values.description,
      tags: values.tags,
      category: values.category,
      imageUrl: values.imageUrl,
      ownerId: userId,
      customIdFormat: {},
      fields: {},
      isPublic: Boolean(values.isPublic),
    }),
  });
};

export default handleAddInventory;
