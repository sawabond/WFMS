import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from '../../api/axiosClient';
import useAuthHeaders from '../../hooks/useAuthHeaders';
import UserCard from '../../components/UserCard';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const headers = useAuthHeaders();

  useEffect(() => {
    setLoading(true);

    axiosClient
      .get(`/User`, headers)
      .then((response) => {
        setLoading(false);
        setUsers(response.data.data);
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
          {users.map((x) => {
            return <UserCard user={x} />;
          })}
        </div>
      )}
    </>
  );
}
