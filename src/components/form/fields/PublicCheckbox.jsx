import { FormControlLabel, Checkbox } from '@mui/material';

const PublicCheckbox = ({ value, onChange, onBlur, name, label }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={!!value[name]}
          onChange={onChange}
          onBlur={onBlur}
        />
      }
      label={label}
    />
  );
};

export default PublicCheckbox;
