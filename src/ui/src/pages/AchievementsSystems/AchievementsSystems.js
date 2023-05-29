import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import AchievementSystemComponent from '../../components/AchievementSystemComponent';
import Header from '../../components/Header';
const BASE_URL = `https://localhost:7184/api`;
export default function AchievementSystems() {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let StorageUser = JSON.parse(sessionStorage.getItem('user'));
    axios
      .get(BASE_URL + `/AchievementSystem`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + StorageUser.token,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setLoading(true);
        setData(data);
      });
  }, []);
  return (
    <>
      <Header />
      <div
        className="achiv-systems"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data ? (
          data.map((system) => (
            <AchievementSystemComponent key={system.id} systems={system} />
          ))
        ) : (
          <div className="error">
            <p>No records</p>
          </div>
        )}
      </div>
    </>
  );
}
