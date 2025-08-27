import { useState, useEffect, useRef } from 'react';
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
import AccessSetting from '../components/tabs/accessSetting/AccessSetting';
import ItemTabs from '../components/tabs/ItemsTab.jsx';
import SnackbarAlert from '../components/tools/Snackbar.jsx';
import { useSnackbar } from '../components/services/hooks/useSnackbar';
import { Formik, Form } from 'formik';
import { getSession } from '../components/services/getSession.js';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL;

const InventoryPage = () => {
  const formikRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { inventory, error, loading: inventoryLoading } = useInventory(id);
  const { user, userName, loading: userLoading } = useUserData();
  const [role, setRole] = useState(null);
  const [tab, setTab] = useState('1');
  const [version, setVersion] = useState(1);
  const [lastSavedValues, setLastSavedValues] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  // Проверка роли
  useEffect(() => {
    if (!user?.id) return;
    checkUserRole(user.id)
      .then(setRole)
      .catch(() => setRole(null));
  }, [user]);

  // Инициализация initialValues
  const initialValues = inventory
    ? {
        title: inventory.title || '',
        description: inventory.description || '',
        imageUrl: inventory.imageUrl || '',
        isPublic: inventory.isPublic || false,
        category: inventory.category || '',
        customIds: Array.isArray(inventory.customIdFormat)
          ? inventory.customIdFormat
          : [],
        fields: Array.isArray(inventory.fields) ? inventory.fields : [],
        users: Array.isArray(inventory.users) ? inventory.users : [],
        version: inventory.version || 1,
      }
    : {
        title: '',
        description: '',
        imageUrl: '',
        isPublic: false,
        category: '',
        customIds: [],
        fields: [],
        users: [],
        version: 1,
      };

  useEffect(() => {
    if (inventory) {
      setVersion(initialValues.version);
      setLastSavedValues(initialValues);
    }
  }, [inventory]);

  // Проверка изменений
  const hasChanges = (current, lastSaved) => {
    JSON.stringify(current) !== JSON.stringify(lastSaved);
    //console.log(current);
    //console.log(lastSaved);
  };

  // Сохранение данных
  const handleSave = async (valuesToSave) => {
    if (isSaving) return;
    if (!hasChanges(valuesToSave, lastSavedValues)) return;

    setIsSaving(true);
    showSnackbar('Saving...', 'info');

    try {
      const session = await getSession();
      if (!session) return;

      const updatedValues = { ...valuesToSave, version };
      const res = await fetch(`${API_URL}/api/inventories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(updatedValues),
      });

      if (res.status === 409) {
        const data = await res.json();
        showSnackbar(
          `${t('version.conflict')} ${data.currentVersion}`,
          'error'
        );
        setVersion(data.currentVersion);
        return;
      }

      const savedData = await res.json();
      setLastSavedValues(updatedValues);
      setVersion(savedData.version);
      showSnackbar(t('saved'), 'success');

      setTimeout(() => closeSnackbar(), 2000);
    } catch (err) {
      console.error('Save failed', err);
      showSnackbar(t('saved.fail'), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Автосохранение каждые 9 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      if (formikRef.current) {
        const currentValues = formikRef.current.values;

        if (hasChanges(currentValues, lastSavedValues)) {
          handleSave(currentValues);
        }
      }
    }, 9000);

    return () => clearInterval(interval);
  }, [lastSavedValues]);

  if (inventoryLoading || userLoading) return <Loader />;
  if (error) return <AppBox>{error}</AppBox>;
  if (!inventory || Object.keys(inventory).length === 0)
    return <AppBox>Inventory not found</AppBox>;

  const handleBackClick = () => {
    navigate(role ? '/personal' : '/', { replace: true });
  };

  const handleChange = (event, newValue) => setTab(newValue);

  const validationSchema = Yup.object({
    fields: Yup.array()
      .of(
        Yup.object({
          id: Yup.string().required(t('required')),
          name: Yup.string().trim().required(t('required')),
          type: Yup.string().required(t('required')),
          description: Yup.string().default(''),
          visibleInTable: Yup.boolean().default(true),
          order: Yup.number().required(),
        })
      )
      .default([])
      .test('unique-name', t('name.unique'), (fields) => {
        if (!fields) return true;
        const names = fields.map((f) => f.name?.trim());
        return new Set(names).size === names.length;
      }),
  });

  const isCreator = user?.id === inventory.ownerId;
  const isAdmin = role === 'admin';

  return (
    <AppBox>
      <SnackbarAlert snackbar={snackbar} closeSnackbar={closeSnackbar} />
      <AppBar userName={userName} path={userName ? 'logout' : 'Sign In'} />
      <Container maxWidth='xl'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Title variant='h2' sx={{ marginBlock: '30px', fontWeight: '700' }}>
            {inventory.title}
          </Title>
          <Link
            component='button'
            variant='body2'
            onClick={handleBackClick}
            sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <FastRewindIcon />
            {t('inventories.back')}
          </Link>
        </Box>

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            innerRef={formikRef}
            validateOnChange
            validateOnBlur
            onSubmit={handleSave}>
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                <TabContext value={tab}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                      onChange={handleChange}
                      aria-label='Inventory Tabs'
                      variant='scrollable'
                      scrollButtons='auto'>
                      <Tab label='Items' value='1' />
                      {user && <Tab label='Chat' value='2' />}
                      {(isCreator || isAdmin) && [
                        <Tab label='Setting' value='3' />,
                        <Tab label='Custom IDs' value='4' />,
                        <Tab label='Fields' value='5' />,
                        <Tab label='Access' value='6' />,
                        <Tab label='Stats' value='7' />,
                        <Tab label='Export' value='8' />,
                      ]}
                    </TabList>
                  </Box>

                  <TabPanel value='1'>
                    <ItemTabs
                      isCreator={isCreator}
                      isAdmin={isAdmin}
                      inventory={inventory}
                    />
                  </TabPanel>
                  {user && (
                    <TabPanel value='2'>
                      <Typography>Chat</Typography>
                    </TabPanel>
                  )}
                  {(isCreator || isAdmin) && (
                    <>
                      <TabPanel value='3'>
                        <Typography>Setting</Typography>
                      </TabPanel>
                      <TabPanel value='4'>
                        <CustomIdTab inventoryId={id} />
                      </TabPanel>
                      <TabPanel value='5'>
                        <CustomFieldsTab
                          values={values}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          touched={touched}
                        />
                      </TabPanel>
                      <TabPanel value='6'>
                        <AccessSetting inventory={inventory} />
                      </TabPanel>
                      <TabPanel value='7'>
                        <Typography>Stats</Typography>
                      </TabPanel>
                      <TabPanel value='8'>
                        <Typography>Export</Typography>
                      </TabPanel>
                    </>
                  )}
                </TabContext>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </AppBox>
  );
};

export default InventoryPage;
