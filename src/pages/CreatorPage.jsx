import AppBox from "../components/tools/AppBox.jsx";
import { Box, Typography, Tab, Container } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Title from "../components/tools/Title.jsx";
import { useState } from "react";
import AppBar from '../components/tools/AppBar.jsx';
import { useUserData } from '../components/services/hooks/useUserData';
import RenderUserInventory from '../components/table/RenderUserInventory'

const RenderCreatorPage = () => {
    const [value, setValue] = useState('1');
    const { userName } = useUserData('')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AppBox>
            <AppBar userName={userName} path={'logout'} />
            <Title variant="h4" sx={{ marginBlock: "30px", fontWeight: '700' }}>
                Мой профиль
            </Title>
            <Container maxWidth="xl">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="вкладки инвентаря">
                                <Tab label="My Inventories" value="1" />
                                <Tab label="Users Inventories" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <RenderUserInventory />
                        </TabPanel>
                        <TabPanel value="2">
                            <Typography>Здесь будут отображаться другие инвентари.</Typography>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Container>
        </AppBox>
    );
};

export default RenderCreatorPage;