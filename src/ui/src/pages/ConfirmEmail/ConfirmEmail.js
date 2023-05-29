import React from 'react';
import Header from '../../components/Header';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import LinkText from '../../components/LinkText';

function ConfirmEmail() {
  const { t } = useTranslation();
  const { email } = useParams();

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
          textAlign: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Typography variant="h4">
          {t('PLEASE_CONFIRM_YOUR_EMAIL') + ' ' + email}
          <LinkText
            link="https://mail.google.com/mail/u/0/#advanced-search/from=noreply.generic.web.api%40gmail.com&query=confirm+your+email&isrefinement=true&fromdisplay=noreply.generic.web.api%40gmail.com"
            text={t('OPEN_EMAIL')}
          />
        </Typography>
      </div>
    </>
  );
}

export default ConfirmEmail;
