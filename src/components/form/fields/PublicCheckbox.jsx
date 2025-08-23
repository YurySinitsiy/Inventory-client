import {
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const PublicCheckbox = ({ value, onChange, onBlur, name }) => {
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
            label="Make it public"
        />
    );
};

export default PublicCheckbox