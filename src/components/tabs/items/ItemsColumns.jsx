const ItemsColumns = ({ t, fields }) => {
  const defaultColumns = [
    { field: 'createdBy', headerName: t('created.by'), minWidth: 170, flex: 1 },
    {
      field: 'createdAt',
      headerName: t('created.at'),
      minWidth: 170,
      flex: 1,
      valueFormatter: (value) => new Date(value).toLocaleString(),
    },
    { field: 'customId', headerName: t('custom.id'), minWidth: 170, flex: 1 },
  ];

  const customColumns = (fields || []).map(({ slot, title }) => ({
    field: slot,
    headerName: title,
    minWidth: 50,
    flex: 1,
  }));

  const columns = [...customColumns, ...defaultColumns];

  return columns;
};

export default ItemsColumns;
