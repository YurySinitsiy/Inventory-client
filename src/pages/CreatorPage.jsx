import AppBox from "../components/AppBox";
import { Box, Typography, Link, Button, Tab, Container } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Title from "../components/Title";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import AppBar from '../components/AppBar.jsx'
import getUser from '../components/utils/getUser.js'
import { supabase } from "../lib/supabaseClient";

const renderCreatorPage = () => {
    const [userName, setUserName] = useState(null)
    const [value, setValue] = useState('1');

    useEffect(() => {    //?Вынести в отдельный компонент
        const getUserName = async () => {
            const user = await getUser()
            setUserName(user.user_metadata.name)
        }

        getUserName()
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddInventory = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('User not authentificated')

            const userId = session.user.id

            const res = await fetch("http://localhost:3001/api/inventory", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    title: 'New Inventory',
                    description: "descr",
                    category: "tehno",
                    ownerId: userId,
                    customIdFormat: {},
                    fields: {}
                })
            })

            const data = await res.json()
            console.log("Inventory создан:", data);
        } catch (error) {
            console.error(error)
        }




        console.log('inventory add')
    }
    return (
        <AppBox>
            <AppBar userName={userName} path={'logout'} />
            <Title variant="h4"
                sx={{ marginBlock: "30px", fontWeight: '700' }}>My Profile</Title>
            <Container maxWidth="xl">
                <Box sx={{ width: '100%', typography: 'body1' }}>

                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="My Inventory" value="1" />
                                <Tab label="Other Inventory" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Button
                                sx={{
                                    display: 'block',
                                    backgroundColor: 'white'
                           
                                }}
                                variant="outlined"
                                onClick={handleAddInventory}>add inventory
                            </Button>
                            My Inventory

                        </TabPanel>
                        <TabPanel value="2">Other Inventory</TabPanel>
                    </TabContext>

                </Box>
            </Container>
        </AppBox>
    )
}

export default renderCreatorPage