import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

const inventoriesColumns = [

	{ field: "title", headerName: "Title", minWidth: 170, flex: 1 },
	{
		field: "description",
		headerName: "Description",
		width: 400,
		renderCell: (params) => (
			<Box sx={{ maxHeight: 150, overflow: 'auto', '& p': { margin: 0 } }}>
				<ReactMarkdown>{params.value || ''}</ReactMarkdown>
			</Box>
		),
	},
	{
		field: "category",
		headerName: "Category",
		minWidth: 170,
		flex: 1,
	},
];

export default inventoriesColumns;
