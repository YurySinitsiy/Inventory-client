import { Box, Container } from "@mui/material";
const RenderAppBox = ({ children }) => {
	return (
		<Box
			style={{
				background:
					"radial-gradient(circle,rgba(253, 253, 253, 1) 0%, rgba(255, 255, 255, 1) 100%)",
				width: "100vw",
				height: "100vh",

			}}>
			{children}
		</Box >
	);
};

export default RenderAppBox;
