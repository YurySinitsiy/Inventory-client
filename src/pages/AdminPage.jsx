import AppBox from "../components/tools/AppBox";
import { Container } from "@mui/material";
import AppBar from '../components/tools/AppBar'
import { useUserData } from '../components/services/hooks/useUserData';
import Title from "../components/tools/Title.jsx";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RenderUserInventory from '../components/table/RenderUserInventory'
import { Box, Tab } from "@mui/material";
import { useState } from "react";
import AllUsersAdminActions from '../components/table/users/AllUsersAdminActions.jsx'

import RenderAllUsersInventories from '../components/table/RenderAllUsersInventories.jsx'
const renderAdminPage = () => {
    const [value, setValue] = useState('1');
    const { userName } = useUserData('')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AppBox>
            <AppBar userName={userName} path={'logout'} />
            <Container maxWidth="xl">
                <Title variant="h4" sx={{ marginBlock: "30px", fontWeight: '700' }}>
                    My profile
                </Title>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="вкладки инвентаря">
                                <Tab label="My Inventories" value="1" />
                                <Tab label="All Users Inventories" value="2" />
                                <Tab label="All Users" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <RenderUserInventory />
                        </TabPanel>
                        <TabPanel value="2">
                            <RenderAllUsersInventories />
                        </TabPanel>
                        <TabPanel value="3">
                            <AllUsersAdminActions />
                        </TabPanel>
                    </TabContext>

                </Box>

            </Container>
        </AppBox>
    )
}

export default renderAdminPage