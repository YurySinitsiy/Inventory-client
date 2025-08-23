// CustomFieldsTab.jsx
import { useState, useEffect, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getSession } from '../services/getSession';
import FieldList from './customFields/FieldList';
import FieldTypeButtons from './customFields/FieldTypeButtons';
import SnackbarAlert from './customFields/SnackbarAlert';

const API_URL = import.meta.env.VITE_API_URL;

const fieldTypes = [
    { type: 'text', label: 'Text field' },
    { type: 'multiline', label: 'Multiline field' },
    { type: 'number', label: 'Number field' },
    { type: 'link', label: 'Link field' },
    { type: 'boolean', label: 'True/false' },
];

const CustomFieldsTab = ({ inventoryId, initialFields, initialVersion, onFieldsUpdate }) => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [isSaving, setIsSaving] = useState(false);

    const showSnackbar = (message, severity = 'success') => setSnackbar({ open: true, message, severity });

    const normalizeFields = (data) => data.fields?.fields || [];

    const validationSchema = Yup.object({
        fields: Yup.array().of(
            Yup.object({
                id: Yup.string().required(),
                name: Yup.string()
                    .trim()
                    .required('The name is required')
                    .test('unique-name', 'The name must be unique.', function (value) {
                        const { fields } = this.options.context || {};
                        if (!value || !fields) return true;
                        return fields.filter(f => f.name?.trim() === value.trim()).length <= 1;
                    }),
                type: Yup.string().required(),
                description: Yup.string().default(''),
                visibleInTable: Yup.boolean().default(true),
                order: Yup.number().required()
            })
        )
    });

    const formik = useFormik({
        initialValues: { fields: initialFields?.fields || [], version: initialVersion || 1 },
        validationSchema,
        validateOnChange: true,
        enableReinitialize: true,
        context: { fields: initialFields?.fields || [] },
        onSubmit: async (values, { setSubmitting }) => {
            await saveFields(values.fields, values.version);
            setSubmitting(false);
        }
    });

    const saveFields = useCallback(async (fields, version) => {
        try {
            setIsSaving(true);
            const session = await getSession();
            if (!session) return showSnackbar("You are not logged in", "error");

            const response = await fetch(`${API_URL}/api/inventories/${inventoryId}/fields`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
                body: JSON.stringify({ fields, version })
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.action === 'refresh' && data.fields && data.version) {
                    const normalized = normalizeFields(data);
                    formik.setValues({ fields: normalized, version: data.version });
                    onFieldsUpdate(normalized, data.version);
                }
                showSnackbar(data.message || "Saving error", "error");
            } else {
                const normalized = normalizeFields(data);
                formik.setValues({ fields: normalized, version: data.version });
                onFieldsUpdate(normalized, data.version);
                showSnackbar("The changes are saved", "success");
            }
        } catch (err) {
            console.error(err);
            showSnackbar("Network error when saving", "error");
        } finally {
            setIsSaving(false);
        }
    }, [inventoryId, onFieldsUpdate, formik]);

    // Автосохранение каждые 7 секунд
    useEffect(() => {
        const interval = setInterval(() => {
            formik.validateForm().then(errors => {
                const isValid = Object.keys(errors).length === 0;
                if (formik.dirty && isValid && !isSaving) {
                    saveFields(formik.values.fields, formik.values.version);
                } else if (formik.dirty && !isValid) {
                    showSnackbar("The form contains errors", "warning");
                }
            });
        }, 7000);

        // Очистка интервала при размонтировании
        return () => clearInterval(interval);
    }, [formik.dirty, isSaving, saveFields, formik.values.fields, formik.values.version]);

    const addField = (type) => {
        const newField = {
            id: crypto.randomUUID(),
            name: '', type,
            description: '',
            visibleInTable: true,
            order: formik.values.fields.length
        };
        formik.setFieldValue('fields', [...formik.values.fields, newField]);
    };

    const deleteField = (index) => {
        const newFields = formik.values.fields
            .filter((_, i) => i !== index)
            .map((field, i) => ({ ...field, order: i }));
        formik.setFieldValue('fields', newFields);
    };

    return (
        <Box component="form"
            onSubmit={formik.handleSubmit}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mb: 2
                }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!formik.dirty || formik.isSubmitting}>
                    {formik.isSubmitting ? 'Saving....' : 'Save'}
                </Button>
            </Box>

            <SnackbarAlert
                snackbar={snackbar}
                setSnackbar={setSnackbar} />

            <FieldList
                fields={formik.values.fields}
                formik={formik}
                deleteField={deleteField}
                fieldTypes={fieldTypes}
            />

            <FieldTypeButtons
                fieldTypes={fieldTypes}
                addField={addField}
                fields={formik.values.fields}
            />
        </Box>
    );
};

export default CustomFieldsTab;
