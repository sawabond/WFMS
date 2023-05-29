import React from 'react';
import Header from '../../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
    <>
      <Header />
      <ToastContainer />
    </>
  );
}
