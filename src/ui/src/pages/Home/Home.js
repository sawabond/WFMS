import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from '../../api/axiosClient';
import useAuthHeaders from '../../hooks/useAuthHeaders';
import WindFarm from '../../components/WindFarm';
import LinkText from '../../components/LinkText';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const [windFarms, setWindFarms] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const headers = useAuthHeaders();

  useEffect(() => {
    setLoading(true);

    axiosClient
      .get(`/WindFarm/personal`, headers)
      .then((response) => {
        setLoading(false);
        setWindFarms(response.data.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {windFarms.map((x) => {
            return <WindFarm windFarm={x} />;
          })}
        </div>
      )}
      {windFarms.length === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '20%',
            fontSize: '30px',
          }}
        >
          <LinkText
            link="create-wind-farm"
            text={t('YOU_DONT_HAVE_WINDFARMS')}
          />
        </div>
      )}
    </>
  );
}
