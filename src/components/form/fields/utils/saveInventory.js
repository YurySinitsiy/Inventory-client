import valuesToUpdateInventory from '../services/inventories/entry/valuesToUpdateInventory';
import updateInventory from '../services/inventories/updateInventory';

const saveInventory = async ({
  values,
  version,
  setVersion,
  setLastSaved,
  showSnackbar,
  t,
  inventory,
}) => {
  const dataToUpdate = valuesToUpdateInventory(values, version);
  const data = await updateInventory(inventory.id, dataToUpdate);

  setVersion(data.version);
  setLastSaved({ ...values, version: data.version });
  showSnackbar(t('saved'), 'success');
  return data;
};

export default saveInventory;
