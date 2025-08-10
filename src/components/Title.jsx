import { Typography } from "@mui/material";


const Title = ({ variant = "h3", children, ...props }) => (
    <Typography
        variant={variant}
        component={variant === "h4" ? "h1" : "h2"}
        gutterBottom
        align="center"
        sx={{
            fontWeight: 600,
            m:0,
        }}
        {...props}>
        {children}
    </Typography>
);

export default Title