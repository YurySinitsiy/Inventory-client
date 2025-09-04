import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import handleImageUpload from '../../services/inventories/handleImageUpload';

const InventoryImageUpload = ({ value, onChange, t }) => {
  const [preview, setPreview] = useState(value || '');
  const [uploading, setUploading] = useState(false);

  const startUpload = (files) => {
    const file = files[0];
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
      const data = await handleImageUpload(formData).json();
      endUpload(data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
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
      <Typography>{isDragActive ? t('drop.file') : t('drag.drop')}</Typography>
      {uploading && <Typography>{t('uploading')}</Typography>}
    </Box>
  );
};

export default InventoryImageUpload;
