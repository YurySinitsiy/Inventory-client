import Modal from '../tools/Modal.jsx';
import handleAddInventory from '../services/inventories/handleAddInventory.js';
import { useState, useEffect } from 'react';
import Loader from '../tools/Loader.jsx';
import getTags from '../services/inventories/getTags.js';
import AddInventoryForm from '../form/AddInventoryForm.jsx';
import getCategories from '../services/inventories/getCategories.js';

const AddInventoryModal = ({ open, onClose, onAdd }) => {
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
