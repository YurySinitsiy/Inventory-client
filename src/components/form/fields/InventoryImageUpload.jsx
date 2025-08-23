import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import { useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL;

const InventoryImageUpload = ({ value, onChange }) => {
  const [preview, setPreview] = useState(value || "");
  const [uploading, setUploading] = useState(false);

  const onDrop = async (files) => {
    const file = files[0];
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/api/upload`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setPreview(data.url);
        onChange(data.url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box {...getRootProps()} sx={{ border: "2px dashed gray", p: 2, textAlign: "center" }}>
      <input {...getInputProps()} />
      {preview ? <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: 200 }} /> : null}
      <Typography>{isDragActive ? "Drop file here..." : "Drag & drop or click to upload"}</Typography>
      {uploading && <Typography>Uploading...</Typography>}
    </Box>
  );
};

export default InventoryImageUpload
