import Modal from "../tools/Modal.jsx";
import handleAddInventory from "../services/handleAddInventory.js";
import { useInventories } from "../services/hooks/useInventories";
import Loader from "../tools/Loader";
import { useCategories } from "../services/hooks/useCategories";
import { useTags } from "../services/hooks/useTags";
import InventoryForm from "../form/InventoryForm.jsx";

const AddInventory = ({ open, onClose, onAdd }) => {
  const { isLoading, setIsLoading } = useInventories();
  const { categories, isLoading: loadingCategories } = useCategories();
  const { tags, isLoading: loadingTags } = useTags();
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
  if (isLoading || loadingCategories || loadingTags) return <Loader />;

  return (
    <Modal open={open} onClose={onClose}>
      <InventoryForm
        categories={categories}
        tagOptions={tags}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default AddInventory;
