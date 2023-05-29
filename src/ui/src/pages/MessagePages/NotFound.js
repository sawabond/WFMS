import React from 'react';
import Header from '../../components/Header';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div
        className="not-found"
        style={{
          backgroundColor: '#bec1d0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Typography variant="h4">404 | {t('NOT_FOUND')}</Typography>
      </div>
    </>
  );
}
