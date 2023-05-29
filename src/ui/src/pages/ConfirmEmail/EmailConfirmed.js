import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import LinkText from '../../components/LinkText';

function EmailConfirmed() {
  const { t } = useTranslation();
  const { email } = useParams();

  return (
    <>
      <div
        className="message"
        style={{
          backgroundColor: '#bec1d0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Typography variant="h4">
          {t('YOUR_EMAIL_WAS_CONFIRMED') + ' ' + email + '✅'}
        </Typography>
        <Typography variant="h4">
          <LinkText link="/login" text={t('LOG_IN')} />
        </Typography>
      </div>
    </>
  );
}

export default EmailConfirmed;
