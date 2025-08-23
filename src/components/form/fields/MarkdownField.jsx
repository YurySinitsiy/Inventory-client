import MDEditor from "@uiw/react-md-editor";
import { Box } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../tools/ThemeContext"; // твой ThemeContext
import { useTheme } from "@mui/material/styles";

const MarkdownField = ({ value, onChange, label }) => {
  const { darkMode } = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 2,
        p: 1,
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
      data-color-mode={darkMode ? "dark" : "light"} // важно для MDEditor
    >
      <label>{label}</label>
      <MDEditor
        value={value}
        onChange={onChange}
        textareaProps={{
          style: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      />
    </Box>
  );
};

export default MarkdownField;