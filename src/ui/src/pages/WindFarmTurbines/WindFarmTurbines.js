import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from '../../api/axiosClient';
import useAuthHeaders from '../../hooks/useAuthHeaders';
import { useParams } from 'react-router';
import Turbine from '../../components/Turbine/Turbine';

export default function WindFarmTurbines() {
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
        </div>
      )}
    </>
  );
}
