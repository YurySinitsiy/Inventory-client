import { useState, useEffect, useRef } from 'react';
import {
  Tab,
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useParams, useNavigate } from 'react-router-dom';
import getUser from '../components/services/users/getUser.js';
import Loader from '../components/tools/Loader';
import CustomFieldsTab from '../components/tabs/customFields/CustomFieldsTab.jsx';
import CustomIdTab from '../components/tabs/customId/CustomIdTab.jsx';
import AccessSetting from '../components/tabs/accessSetting/AccessSetting';
import ItemTabs from '../components/tabs/items/ItemsTab.jsx';
import SnackbarAlert from '../components/tools/Snackbar.jsx';
import { useSnackbar } from '../components/services/hooks/useSnackbar';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import getInventory from '../components/services/inventories/getInventory.js';
import LinkBackTo from '../components/tools/LinkBackTo.jsx';
import apiFetch from '../components/services/apiFetch.js';
import InventoryInfoBlock from '../components/inventory/InventoryInfoBlock.jsx';
 import getInventoryTags from '../components/services/inventories/getInventoryTags.js';
 import getInventoryOwner from '../components/services/inventories/getInventoryOwner.js';
import isEqual from 'lodash.isequal';
const InventoryPage = () => {
  const formikRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [inventory, setInventory] = useState(null);
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('1');
  const [version, setVersion] = useState(1);
  const [lastSavedValues, setLastSavedValues] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [invLoading, setInvLoading] = useState(false);
   const [owner, setOwner] = useState(null);
   const [tags, setTags] = useState([]);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const userData = await getUser();
        if (!userData) return;
        setUser(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      setInvLoading(true);
      if (!id) return;
      try {
        const data = await getInventory(id);
        setInventory(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setInvLoading(false);
      }
    };
    fetchInventory();
  }, [id]);

  // Инициализация initialValues
  const initialValues = inventory
    ? {
        title: inventory.title || '',
        description: inventory.description || '',
        imageUrl: inventory.imageUrl || '',
        isPublic: inventory.isPublic || false,
        category: inventory.category || '',
        tags: inventory.InventoryTag
          ? inventory.InventoryTag.map((it) => it.Tag?.name) // массив названий тегов
          : [],
        customIds: Array.isArray(inventory.customIdFormat)
          ? inventory.customIdFormat
          : [],
        fields: Array.isArray(inventory.fieldConfigs)
          ? inventory.fieldConfigs
          : [],
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
        tags: [],
        users: [],
        version: 1,
      };

  useEffect(() => {
    if (inventory) {
      setVersion(initialValues.version);
      setLastSavedValues(initialValues);
    }
  }, [inventory]);

  useEffect(() => {
    const fetchInvData = async () => {
      if (!id) return;
      try {
        const ownerData = await getInventoryOwner(id);
        const tags = await getInventoryTags(id);
        setOwner(ownerData); // сохраняем в стейт
        setTags(tags);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInvData();
  }, [id]);

  // Проверка изменений
  const hasChanges = (current, lastSaved) => !isEqual(current, lastSaved);

  // Сохранение данных
  const handleSave = async (valuesToSave) => {
    if (isSaving) return;
    if (!hasChanges(valuesToSave, lastSavedValues)) return;
    setIsSaving(true);
    showSnackbar('Saving...', 'info');

    try {
      const payload = {
        title: valuesToSave.title,
        description: valuesToSave.description,
        imageUrl: valuesToSave.imageUrl,
        isPublic: valuesToSave.isPublic,
        customIdFormat: valuesToSave.customIds,
        category: valuesToSave.category,
        tags: valuesToSave.tags,
        version: version,
        users: valuesToSave.users,
        fields: valuesToSave.fields.map((f) => ({
          slot: f.slot,
          title: f.title,
          description: f.description,
          type: f.type,
          visibleInTable: f.visibleInTable,
          position: f.order,
        })),
      };
      console.log(payload);
      const data = await apiFetch(`/api/inventories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      // обновляем локальное состояние с актуальной версией
      setVersion(data.version);
      setLastSavedValues({ ...payload, version: data.version });

      showSnackbar(t('saved'), 'success');
      setTimeout(() => closeSnackbar(), 2000);
      console.log(data);
    } catch (err) {
      console.error('Save failed', err);
      if (err?.currentVersion) {
        // сервер вернул конфликт версий
        showSnackbar(
          t('saved.versionConflict', { currentVersion: err.currentVersion }),
          'error'
        );
        setVersion(err.currentVersion);
      } else {
        showSnackbar(t('saved.fail'), 'error');
      }
    } finally {
      setIsSaving(false);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!formikRef.current) return;

  //     const currentValues = {
  //       ...formikRef.current.values,
  //       version: lastSavedValues.version,
  //     };

  //     if (!isEqual(currentValues, lastSavedValues)) {
  //       handleSave(currentValues);
  //     }
  //   }, 9000);

  //   return () => clearInterval(interval);
  // }, [lastSavedValues]); // подписка на lastSavedValues

  if (invLoading || isLoading) return <Loader />;

  const handleBackClick = () => {
    navigate(user?.role ? '/personal' : '/', { replace: true });
  };

  const handleChange = (event, newValue) => setTab(newValue);

  const validationSchema = Yup.object({
    fields: Yup.array().of(
      Yup.object({
        title: Yup.string().trim().required(t('required')),
        type: Yup.string().required(t('required')),
        description: Yup.string().notRequired(),
        visibleInTable: Yup.boolean().notRequired(),
      })
    ),
  });
  const isCreator = user?.id === inventory?.ownerId;
  const isAdmin = user?.role === 'admin';
  return (
    <Container maxWidth='xl'>
      <SnackbarAlert snackbar={snackbar} closeSnackbar={closeSnackbar} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <InventoryInfoBlock inventory={inventory} />
        <LinkBackTo
          onClick={handleBackClick}
          text={t('inventories.back')}></LinkBackTo>
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
                    variant={isSmall ? 'scrollable' : 'standard'}
                    scrollButtons={isSmall ? 'auto' : false}
                    allowScrollButtonsMobile
                    centered>
                    <Tab label={t('tab.items')} value='1' />
                    {user &&
                      (isCreator || isAdmin) && [
                        <Tab label={t('tab.id.custom')} value='2' />,
                        <Tab label={t('tab.fields')} value='3' />,
                        <Tab label={t('tab.access')} value='4' />,
                      ]}
                  </TabList>
                </Box>

                <TabPanel value='1'>
                  <ItemTabs
                    isCreator={isCreator}
                    user={user}
                    isAdmin={isAdmin}
                    inventory={inventory}
                  />
                </TabPanel>

                {user && (isCreator || isAdmin) && (
                  <>
                    <TabPanel value='2'>
                      <CustomIdTab
                        values={values}
                        setFieldValue={setFieldValue}
                        fieldName='customIds'
                      />
                    </TabPanel>
                    <TabPanel value='3'>
                      <CustomFieldsTab
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                      />

                      {/* //!Настроить авто-сейв и убрать кнопку */}
                      <Button
                        type='submit'
                        variant='contained'
                        color='success'
                        indicator='false'>
                        {t('save')}
                      </Button>
                    </TabPanel>
                    <TabPanel value='4'>
                      <AccessSetting inventory={inventory} />
                    </TabPanel>
                  </>
                )}
              </TabContext>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default InventoryPage;
