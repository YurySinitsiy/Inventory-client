import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CustomFieldsTab from './customFields/CustomFieldsTab';
import CustomIdTab from './customId/CustomIdTab';
import AccessSetting from './accessSetting/AccessSetting';
import ItemTabs from './items/ItemsTab.jsx';
import { Tab, Box, useTheme, useMediaQuery, Button } from '@mui/material';
import { useState } from 'react';


const InventoryTabs = ({
  inventory,
  user,
  values,
  setFieldValue,
  errors,
  touched,
  handleBlur,
  t,
}) => {
  const [tab, setTab] = useState('1');
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => setTab(newValue);

  const SaveButton = () => (
    <Button variant='contained' type='submit' color='success'>
      {t('save')}
    </Button>
  );

  const isCreator = user?.id === inventory?.ownerId;
  const isAdmin = user?.role === 'admin';
  return (
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          onChange={handleChange}
          aria-label='Inventory Tabs'
          variant={isSmall ? 'scrollable' : 'standard'}
          scrollButtons={isSmall ? 'auto' : false}
          allowScrollButtonsMobile
          centered={!isSmall ? true : false}>
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
          t={t}
        />
      </TabPanel>

      {user && (isCreator || isAdmin) && (
        <>
          <TabPanel value='2'>
            <CustomIdTab
              values={values}
              setFieldValue={setFieldValue}
              fieldName='customIds'
              errors={errors}
              touched={touched}
              t={t}
              handleBlur={handleBlur}
            />
            <SaveButton />
          </TabPanel>
          <TabPanel value='3'>
            <CustomFieldsTab
              values={values}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              t={t}
              handleBlur={handleBlur}
            />
            <SaveButton />
          </TabPanel>
          <TabPanel value='4'>
            <AccessSetting inventory={inventory} t={t} />
          </TabPanel>
        </>
      )}
    </TabContext>
  );
};

export default InventoryTabs;
