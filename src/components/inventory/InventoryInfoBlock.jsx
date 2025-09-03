import { Box, Typography, Avatar, Chip } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const Title = styled(Typography)({
  fontWeight: 700,
  margin: 0,
  fontSize: '1.8rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const InfoText = styled(Typography)({
  margin: 0,
  fontSize: '1rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const TagContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

const InventoryInfoBlock = ({ inventory }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 2,
        padding: 2,
        marginBlock: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        maxWidth: 600,
        backgroundColor: theme.palette.background.paper,
      }}>
      <Avatar
        variant='rounded'
        src={inventory?.imageUrl || undefined}
        alt={inventory?.title || 'No image'}
        sx={{ width: 120, height: 120, flexShrink: 0 }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Title variant='h2'>{inventory?.title || '-'}</Title>
          {inventory?.isPublic ? (
            <PublicIcon color='action' fontSize='small' />
          ) : (
            <LockIcon color='action' fontSize='small' />
          )}
        </Box>

        <InfoText variant='body1'>
          {t('owner')}:{' '}
          {inventory.owner
            ? `${inventory.owner.name} ${inventory.owner.surname}`
            : inventory.owner.email || '-'}
        </InfoText>

        <Box sx={{ display: 'flex', overflow: 'auto', '& p': { margin: 0 } }}>
          {t('description')}:
          <ReactMarkdown>{inventory?.description || '-'}</ReactMarkdown>
        </Box>

        {inventory?.category && (
          <InfoText variant='body2'>
            {t('category')}: {inventory.category}
          </InfoText>
        )}

        {inventory?.InventoryTag && inventory?.InventoryTag.length > 0 && (
          <TagContainer>
            {t('tags')}
            {inventory?.InventoryTag.map((tag, index) => (
              <Chip key={index} label={`● ${tag.Tag.name}`} size='medium' />
            ))}
          </TagContainer>
        )}

        <InfoText variant='body2'>
          {t('created.at')}: {formatDate(inventory?.createdAt)}
        </InfoText>
      </Box>
    </Box>
  );
};

export default InventoryInfoBlock;
