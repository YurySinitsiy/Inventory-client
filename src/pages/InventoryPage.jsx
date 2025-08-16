import Loader from '../components/tools/Loader'
import AppBox from '../components/tools/AppBox'
import AppBar from '../components/tools/AppBar.jsx'
import { useParams, useNavigate } from 'react-router-dom'
import { useInventory } from '../components/services/hooks/useInventory.js'
import { useUserData } from '../components/services/hooks/useUserData.jsx';
import { Box, Container, Link, Typography, Tab, } from "@mui/material";
import Title from "../components/tools/Title.jsx";
import FastRewindIcon from '@mui/icons-material/FastRewind';
import checkUserRole from '../components/auth/CheckUserRole.jsx'
import { useEffect, useState } from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const RenderInventoryPage = () => {
    const { id } = useParams();
    const { inventory, error, loading: inventoryLoading } = useInventory(id);
    const { user, userName, loading: userLoading } = useUserData();
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const [value, setValue] = useState('1');

    useEffect(() => {
        if (!user?.id) return;
        checkUserRole(user.id).then(setRole).catch(() => setRole(null));
    }, [user]);

    const isLoading = inventoryLoading || userLoading;

    const handleBackClick = () => {
        navigate(role ? `/${role}` : '/');
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (isLoading) return <Loader />;
    if (error) return <AppBox>{error}</AppBox>;
    if (!inventory || Object.keys(inventory).length === 0) return <AppBox>No inventory found</AppBox>;

    return (
        <AppBox>
            <AppBar userName={userName} path={userName ? 'logout' : 'Sign In'} />
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Title variant="h2" sx={{ marginBlock: "30px", fontWeight: '700' }}>
                        {inventory.title}
                    </Title>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={handleBackClick}
                        sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                    >
                        <FastRewindIcon />
                        Back to Inventories
                    </Link>
                </Box>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="вкладки инвентаря">
                                <Tab label="Items" value="1" />
                                <Tab label="Chat" value="2" />
                                <Tab label="Settings" value="3" />
                                <Tab label="Custom ID" value="4" />
                                <Tab label="Fields" value="5" />
                                <Tab label="Access" value="6" />
                                <Tab label="Stats" value="7" />
                                <Tab label="Export" value="8" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Typography>Items</Typography>
                        </TabPanel>
                        <TabPanel value="2">
                            <Typography>Chat</Typography>
                        </TabPanel>
                        <TabPanel value="3">
                            <Typography>Settings</Typography>
                        </TabPanel>
                        <TabPanel value="4">
                            <Typography>Custom ID</Typography>
                        </TabPanel>
                        <TabPanel value="5">
                            <Typography>Fields</Typography>
                        </TabPanel>
                        <TabPanel value="6">
                            <Typography>Access</Typography>
                        </TabPanel>
                        <TabPanel value="7">
                            <Typography>Stats</Typography>
                        </TabPanel>
                        <TabPanel value="8">
                            <Typography>Export</Typography>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Container>
        </AppBox>
    );
};

export default RenderInventoryPage;
