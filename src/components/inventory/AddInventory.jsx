import { useState } from 'react';
import { Box, Button, TextField, Modal, Typography } from '@mui/material';
import { supabase } from '../../lib/supabaseClient';
import AuthForm from '../auth/AuthForm'
import * as Yup from "yup";

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
    const [formData, setFormData] = useState({
        title: 'Nev inventory',
        description: 'Description',
        category: 'Category'
    });
    const [error, setError] = useState(null);

    const handleAdd = async (values) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Пользователь не аутентифицирован');

            const userId = session.user.id;
            const res = await fetch('http://localhost:3001/api/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                    title: values.title,
                    description: values.description,
                    category: values.category,
                    ownerId: userId,
                    customIdFormat: {},
                    fields: {},
                }),
            });

            if (!res.ok) throw new Error('Не удалось создать инвентарь');
            const data = await res.json();
            onAdd(data);
            onClose();
            setFormData({
                title: 'Nev inventory',
                description: 'Description',
                category: 'Category'
            })
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

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
                    initialValues={{ title: "", description: "", category: '' }}
                    validationSchema={Yup.object({
                        title: Yup.string().required("Required field"),
                        description: Yup.string().required("Required field"),
                        category: Yup.string().required("Required field"),
                    })}
                    fields={[
                        { name: "title", label: "Title", type: "text" },
                        { name: "description", label: "Description", type: "text" },
                        { name: "category", label: "Category", type: "text" },

                    ]}
                    onSubmit={handleAdd}
                />

            </Box>
        </Modal>
    );
};

export default AddInventory;