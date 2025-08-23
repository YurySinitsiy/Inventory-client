import { Autocomplete, TextField } from "@mui/material";

const CategoryField = ({ value, onChange, categories = [] }) => {
  return (
    <Autocomplete
      freeSolo
      options={categories}
      value={value || ""}
      onChange={(e, newValue) => onChange(newValue)}
      onInputChange={(e, inputValue) => onChange(inputValue)}
      renderInput={(params) => <TextField {...params} label="Category" margin="normal" />}
      ListboxProps={{ style: { maxHeight: 150 } }}
    />
  );
};

export default CategoryField