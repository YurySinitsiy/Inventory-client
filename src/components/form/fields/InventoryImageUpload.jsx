import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import uploadImageDirect from '../../services/inventories/uploadImageDirect';
import { useSnackbar } from '../../context/SnackbarContext';
import { useTranslation } from 'react-i18next';

const InventoryImageUpload = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState(value || '');
  const [uploading, setUploading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const startUpload = (files) => {
    const file = files[0];
    if (file.size > MAX_FILE_SIZE) {
      showSnackbar(t('image.size'), 'error');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  };

  const endUpload = (url) => {
    if (url) {
      setPreview(url);
      onChange(url);
    }
  };

  const onDrop = async (files) => {
    const formData = startUpload(files);
    try {
      const data = await uploadImageDirect(formData);
      endUpload(data.url);
    } catch (err) {
      console.error('Image upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
  });

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{ border: '2px dashed gray', p: 2, textAlign: 'center' }}>
        <input {...getInputProps()} />
        {preview ? (
          <img
            src={preview}
            alt='Preview'
            style={{ maxWidth: '100%', maxHeight: 200 }}
          />
        ) : null}
        <Typography>
          {isDragActive ? t('drop.file') : t('drag.drop')}
        </Typography>
        {uploading && <Typography>{t('uploading')}</Typography>}
      </Box>
    </>
  );
};

export default InventoryImageUpload;
