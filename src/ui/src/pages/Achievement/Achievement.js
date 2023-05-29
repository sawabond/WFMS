import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import AchievementComponent from '../../components/AchievementComponent';
import { Button } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BASE_URL = `https://localhost:7184/api`;

export default function Achievement() {
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(BASE_URL + `/AchievementSystem/${searchParams.get('id')}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + StorageUser.token,
        },
      })
      .then(({ data }) => {
        setLoading(true);
        setData(data);
        console.log(data);
      });
  }, []);

  let StorageUser = JSON.parse(sessionStorage.getItem('user'));

  return (
    <>
      <Header />
      <div className="div" style={{ margin: '1%' }}>
        <Link
          to={`/create-achievements?id=${searchParams.get('id')}`}
          style={{ textDecoration: 'none' }}
        >
          <Button variant="contained">{t('ADD_NEW_ACHIEVEMENT')}</Button>
        </Link>
      </div>
      <div
        className="achiv-systems"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {isLoading &&
          data.achievements.map((achievement) => (
            <AchievementComponent
              key={achievement.id}
              achievement={achievement}
            />
          ))}
      </div>
    </>
  );
}
