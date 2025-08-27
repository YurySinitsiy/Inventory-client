import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

const getColumns = () => {
  const { t } = useTranslation();

  const inventoriesColumns = [
    { field: 'title', headerName: t('title'), minWidth: 170, flex: 1 },
    {
      field: 'description',
      headerName: t('description'),
      width: 400,
      renderCell: (params) => (
        <Box sx={{ maxHeight: 150, overflow: 'auto', '& p': { margin: 0 } }}>
          <ReactMarkdown>{params.value || ''}</ReactMarkdown>
        </Box>
      ),
    },
    {
      field: 'category',
      headerName: t('category'),
      minWidth: 170,
      flex: 1,
    },
  ];
  return inventoriesColumns;
};

export default getColumns;
