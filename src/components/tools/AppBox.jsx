import { Box } from "@mui/material";
const RenderAppBox = ({ children }) => {
	return (
		<Box
			style={{
				background:
					"radial-gradient(circle,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)",
				width: "100vw",
				height: "100vh",

			}}>
			{children}
		</Box >
	);
};

export default RenderAppBox;
