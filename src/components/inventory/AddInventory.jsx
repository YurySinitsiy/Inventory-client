import { Box, Modal, } from '@mui/material';
import handleAddInventory from '../services/handleAddInventory.js';
import { useInventories } from "../services/hooks/useInventories";
import Loader from '../tools/Loader'
import { useCategories } from '../services/hooks/useCategories';
import { useTags } from '../services/hooks/useTags';
import InventoryForm from "../form/InventoryForm.jsx"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const AddInventory = ({ open, onClose, onAdd }) => {
    const { isLoading, setIsLoading } = useInventories();
    const { categories, isLoading: loadingCategories } = useCategories();
    const { tags, isLoading: loadingTags } = useTags();;
    const onSubmit = async (values) => {
        try {
            setIsLoading(true)
            onAdd(await handleAddInventory(values))
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }
    };
    if (isLoading || loadingCategories || loadingTags) return <Loader />;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <InventoryForm
                categories={categories}
                tagOptions = {tags}
                onSubmit={onSubmit}>
                </InventoryForm>
            </Box>
        </Modal>
    );
};

export default AddInventory;