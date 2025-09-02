import Modal from '../tools/Modal.jsx';
import handleAddInventory from '../services/inventories/handleAddInventory.js';
import { useState, } from 'react';
import Loader from '../tools/Loader.jsx';
import InventoryForm from '../form/InventoryForm.jsx';

const AddInventoryModal = ({ open, onClose, onAdd }) => {
  const [isLoading, setIsLoading] = useState(false);

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
  if (isLoading) return <Loader />;

  return (
    <Modal open={open} onClose={onClose}>
      <InventoryForm
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default AddInventoryModal;
