const UsersColumns = ({t}) => {
  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 170, flex: 1 },
    { field: 'email', headerName: t('auth.email'), minWidth: 170, flex: 1 },
    { field: 'name', headerName: t('auth.name'), minWidth: 170, flex: 1 },
    { field: 'surname', headerName: t('auth.surname'), minWidth: 170, flex: 1 },
    { field: 'role', headerName: t('auth.role'), minWidth: 170, flex: 1 },
    {
      field: 'status',
      headerName: t('auth.status'),
      minWidth: 170,
      flex: 1,
      renderCell: ({ row }) => (
        <span style={{ color: row.status === 'blocked' ? 'red' : 'green' }}>
          {row.status === 'blocked' ? 'Blocked' : 'Active'}
        </span>
      ),
    },
  ];

  return columns
}

export default UsersColumns