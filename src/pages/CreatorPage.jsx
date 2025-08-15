import AppBox from "../components/tools/AppBox.jsx";
import { Box, Typography, Tab, Container, Snackbar, Alert } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Title from "../components/tools/Title.jsx";
import { useState, useEffect } from "react";
import Loader from "../components/tools/Loader.jsx";
import AppBar from '../components/tools/AppBar.jsx';
import getUser from '../components/services/getUser.js';
import { supabase } from "../lib/supabaseClient";
import RenderUserInventory from '../components/table/RenderUserInventory.jsx'

const renderCreatorPage = () => {
    const [userName, setUserName] = useState(null);
    const [value, setValue] = useState('1');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserName = async () => {
            try {
                const user = await getUser();
                setUserName(user.user_metadata.name);
            } catch (err) {
                setError('Не удалось загрузить данные пользователя');
            }
        };
        getUserName();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (loading) return <Loader />

    return (
        <AppBox>
            <AppBar userName={userName} path={'logout'} />
            <Title variant="h4" sx={{ marginBlock: "30px", fontWeight: '700' }}>
                Мой профиль
            </Title>
            <Container maxWidth="xl">
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => setError(null)}
                >
                    <Alert severity="error" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                </Snackbar>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="вкладки инвентаря">
                                <Tab label="Мой инвентарь" value="1" />
                                <Tab label="Другой инвентарь" value="2" />
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

export default renderCreatorPage;