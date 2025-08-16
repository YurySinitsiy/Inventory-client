import AppBox from "../components/tools/AppBox";
import AppBar from '../components/tools/AppBar'
import { Paper, Container } from "@mui/material";
import InventoryTable from "../components/table/InventoryTable";
import Title from "../components/tools/Title.jsx";
import Loader from '../components/tools/Loader.jsx'
import { useInventories } from "../components/services/hooks/useInventories.js";
const RenderMainPage = () => {
    const { inventories, isLoading } = useInventories();

    const columns = [
        { field: 'title', headerName: 'Title', minWidth: 170, flex: 1 },
        { field: 'description', headerName: 'Description', minWidth: 270, flex: 1 },
        { field: 'category', headerName: 'Category', minWidth: 170, flex: 1 },
    ];
    if (isLoading) return <Loader />

    return (
        <AppBox>
            <AppBar />
            <Container maxWidth="xl">
                <Title variant="h4" sx={{ marginBlock: "30px", fontWeight: '700' }}>
                    All public inventories
                </Title>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <InventoryTable
                        inventories={inventories || []}
                        enotherColumns={columns}
                    />
                </Paper>
            </Container>
        </AppBox>
    )
}

export default RenderMainPage