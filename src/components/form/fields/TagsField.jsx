// TagsAutocomplete.jsx
import { Autocomplete, TextField } from "@mui/material";

const TagsField = ({ value, onChange, tagOptions }) => {
  return (
    <Autocomplete
      multiple
      freeSolo
      options={tagOptions}
      value={value || []}
      onChange={(e, newValue) => onChange(newValue)}
      renderInput={(params) => <TextField {...params} label="Tags" margin="normal" />}
      ListboxProps={{ style: { maxHeight: 150 } }}
    />
  );
}

export default TagsField;
