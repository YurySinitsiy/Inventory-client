import { Box, Modal, } from '@mui/material';
import AuthForm from '../auth/AuthForm'
import * as Yup from "yup";
import handleAddInventory from '../services/handleAddInventory';
import { useInventories } from "../services/hooks/useInventories";
import Loader from '../tools/Loader'

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
    const { isLoading } = useInventories();

    const onSubmit = async (values) => {
        try {
            onAdd(await handleAddInventory(values))
            onClose();
        } catch (err) {
            console.error(err);
        }
    };
    if (isLoading) return <Loader />

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <AuthForm
                    title="Add inventory"
                    submitText="Add inventory"
                    initialValues={{ title: "", description: "", category: '', isPublic: false }}
                    validationSchema={Yup.object({
                        title: Yup.string().required("Required field"),
                        description: Yup.string().required("Required field"),
                        category: Yup.string().required("Required field"),
                    })}
                    fields={[
                        { name: "title", label: "Title", type: "text" },
                        { name: "description", label: "Description", type: "text" },
                        { name: "category", label: "Category", type: "text" },
                        { name: "isPublic", label: "Make it public", type: "checkbox" },
                    ]}

                    onSubmit={onSubmit}
                />
            </Box>
        </Modal>
    );
};

export default AddInventory;