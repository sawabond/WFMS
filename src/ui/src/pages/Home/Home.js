import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from '../../api/axiosClient';
import useAuthHeaders from '../../hooks/useAuthHeaders';
import WindFarm from '../../components/WindFarm';

export default function Home() {
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
    </>
  );
}
