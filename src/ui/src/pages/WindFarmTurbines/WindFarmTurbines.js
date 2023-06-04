import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from '../../api/axiosClient';
import useAuthHeaders from '../../hooks/useAuthHeaders';
import { useParams } from 'react-router';
import Turbine from '../../components/Turbine/Turbine';
import LinkText from '../../components/LinkText';
import { useTranslation } from 'react-i18next';

export default function WindFarmTurbines() {
  const { t } = useTranslation();
  const [windFarmTurbines, setWindFarmTurbines] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const headers = useAuthHeaders();
  const { farmId } = useParams();

  useEffect(() => {
    setLoading(true);

    axiosClient
      .get(`/WindFarm/${farmId}/Turbines`, headers)
      .then((response) => {
        setLoading(false);
        setWindFarmTurbines(response.data.data);
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
          {windFarmTurbines.map((x) => {
            return <Turbine turbine={x} farmId={farmId} />;
          })}
          {windFarmTurbines.length === 0 && (
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
                link="turbines/create"
                text={t('YOU_DONT_HAVE_TURBINES')}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
