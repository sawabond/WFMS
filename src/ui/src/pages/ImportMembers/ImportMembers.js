import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ImportMembers.scss';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

export default function ImportMembers() {
  const { t } = useTranslation();

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append('memberList', selectedFile);
    axios
      .post('https://localhost:7184/api/User/import-members', formData, {
        headers: {
          Authorization: 'Bearer ' + StorageUser.token,
        },
      })
      .then((response) => {
        if (response) {
          toast.success(t('USERS_SUCCESSFULLY_IMPORTED'));
        }
        if (response.data.error) {
          console.log(response.data.error);
        }
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          toast.warning(t(error.response.data));
          return;
        }
        if (error.response.status > 400) {
          toast.warning(t('UNKNOWN_ERROR_OCCURRED'));
        }
      });
  };
  let StorageUser = JSON.parse(sessionStorage.getItem('user'));
  console.log(StorageUser);
  return (
    <>
      <Header />
      <ToastContainer />

      <div
        className="upload"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90%',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4">
          {t('IMPORT_NEW_USERS_OF_YOUR_COMPANY')}:
        </Typography>
        <div
          className="upload-choose-file"
          style={{
            width: '25%',
            margin: '1%',
          }}
        >
          <label className="custom-file-upload">
            <input type="file" multiple onChange={changeHandler} />
            <div
              className="div"
              style={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <FileUploadIcon />
              {isFilePicked ? (
                <p>{selectedFile.name}</p>
              ) : (
                <Typography variant="body2">
                  {t('CHOOSE_FILE_WITH_USER_LIST')}
                </Typography>
              )}
            </div>
          </label>
        </div>
        <div className="upload-button">
          <Button color="primary" onClick={handleSubmission}>
            {t('UPLOAD')}
          </Button>
        </div>
      </div>
    </>
  );
}
