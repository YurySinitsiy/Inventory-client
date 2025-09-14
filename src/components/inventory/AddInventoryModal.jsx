import Modal from '../tools/Modal';
import handleAddInventory from '../services/inventories/handleAddInventory';
import { useState, useEffect } from 'react';
import Loader from '../tools/Loader';
import getTags from '../services/inventories/getTags';
import AddInventoryForm from '../form/AddInventoryForm';
import getCategories from '../services/inventories/getCategories';
import { useTranslation } from 'react-i18next';

const AddInventoryModal = ({ open, onClose, onAdd }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, tgs] = await Promise.all([getCategories(), getTags()]);
        setCategories(cats);
        setTags(tgs);
      } catch (error) {
        console.error('Data wodnload error:', error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      onAdd(await handleAddInventory(values));
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  if (loadingData || isLoading) return <Loader />;

  return (
    <Modal open={open} onClose={onClose}>
      <AddInventoryForm
        categories={categories}
        tagOptions={tags}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default AddInventoryModal;
