import { useState, useEffect } from 'react';
import { Tab, Box, Typography, Container, Link } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useParams, useNavigate } from 'react-router-dom';
import { useInventory } from '../components/services/hooks/useInventory.js';
import { useUserData } from '../components/services/hooks/useUserData.jsx';
import checkUserRole from '../components/auth/CheckUserRole.jsx';
import AppBox from '../components/tools/AppBox';
import AppBar from '../components/tools/AppBar.jsx';
import Loader from '../components/tools/Loader';
import Title from '../components/tools/Title.jsx';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import CustomFieldsTab from '../components/tabs/CustomFieldsTab.jsx';
import CustomIdTab from '../components/tabs/CustomIdTab.jsx';

// Главная страница инвентаря
const InventoryPage = () => {
    const { id } = useParams(); // Получаем ID инвентаря из URL
    const { inventory, error, loading: inventoryLoading } = useInventory(id);
    const { user, userName, loading: userLoading } = useUserData();
    const [role, setRole] = useState(null);
    const [tab, setTab] = useState('1'); // Текущая вкладка
    const [fields, setFields] = useState([]); // Поля инвентаря
    const [version, setVersion] = useState(1); // Версия данных
    const navigate = useNavigate();

    // Проверяем роль пользователя
    useEffect(() => {
        if (!user?.id) return;
        checkUserRole(user.id)
            .then((userRole) => setRole(userRole))
            .catch(() => setRole(null));
    }, [user]);

    // Загружаем поля и версию из inventory
    useEffect(() => {
        if (inventory && inventory.fields && inventory.version) {
            console.log('Загружаем поля:', inventory.fields);
            setFields(inventory.fields.fields || []);
            setVersion(inventory.version || 1);
        }
    }, [inventory]);

    // Показываем загрузку, если данные ещё не готовы
    const isLoading = inventoryLoading || userLoading;
    if (isLoading) return <Loader />;

    // Показываем ошибку, если она есть
    if (error) return <AppBox>{error}</AppBox>;

    // Показываем сообщение, если инвентарь не найден
    if (!inventory || Object.keys(inventory).length === 0) {
        return <AppBox>Inventory not found</AppBox>;
    }

    // Функция для возврата назад
    const handleBackClick = () => {
        navigate(role ? `/${role}` : '/');
    };

    // Переключение вкладок
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    // Обновление полей и версии из CustomFieldsTab
    const handleFieldsUpdate = (newFields, newVersion) => {
        console.log('Обновляем поля в InventoryPage:', newFields);
        setFields(newFields);
        setVersion(newVersion);
    };

    return (
        <AppBox>
            <AppBar userName={userName} path={userName ? 'logout' : 'Sign In'} />
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Title variant="h2" sx={{ marginBlock: '30px', fontWeight: '700' }}>
                        {inventory.title}
                    </Title>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={handleBackClick}
                        sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                    >
                        <FastRewindIcon />
                        Back to inventories
                    </Link>
                </Box>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="Inventory Tabs"
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                <Tab label="Items" value="1" />
                                {user && [
                                    <Tab key="chat" label="Chat" value="2" />,
                                    <Tab key="settings" label="Setting" value="3" />,
                                    <Tab key="customId" label="Custom IDs" value="4" />,
                                    <Tab key="fields" label="Fields" value="5" />,
                                    <Tab key="access" label="Access" value="6" />,
                                    <Tab key="stats" label="Stats" value="7" />,
                                    <Tab key="export" label="Export" value="8" />
                                ]}
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Typography>Items</Typography>
                        </TabPanel>
                        {user && (
                            <>
                                <TabPanel value="2">
                                    <Typography>Chat</Typography>
                                </TabPanel>
                                <TabPanel value="3">
                                    <Typography>Setting</Typography>
                                </TabPanel>
                                <TabPanel value="4">
                                    <CustomIdTab inventoryId={id} />
                                </TabPanel>
                                <TabPanel value="5">
                                    <CustomFieldsTab
                                        inventoryId={id}
                                        initialFields={{ fields }}
                                        initialVersion={version}
                                        onFieldsUpdate={handleFieldsUpdate}
                                    />
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
                            </>
                        )}
                    </TabContext>
                </Box>
            </Container>
        </AppBox>
    );
};

export default InventoryPage;