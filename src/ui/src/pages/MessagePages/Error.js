import React from 'react';
import Header from '../../components/Header';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

export default function Error() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div
        className="error"
        style={{
          backgroundColor: '#bec1d0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Typography variant="h4">
          403 | {t('YOU_ARE_NOT_ALLOWED_TO_VIEW_THIS_PAGE')}
        </Typography>
      </div>
    </>
  );
}
