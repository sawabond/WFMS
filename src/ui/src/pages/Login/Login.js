import React, { useContext } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Header from '../../components/Header';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { userContext } from '../../Contexts/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import useAuthHeaders from '../../hooks/useAuthHeaders';

export default function Login() {
  const { user, setUser } = useContext(userContext);
  const { t } = useTranslation();
  const { authHeaders } = useAuthHeaders();

  const formik = useFormik({
    initialValues: {
      UserName: '',
      Password: '',
    },

    onSubmit: (values, { resetForm }) => {
      axiosClient
        .post(
          `/auth/login`,
          {
            UserName: values.UserName,
            Password: values.Password,
          },
          authHeaders
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            toast.success(t('YOU_ARE_LOGGED_IN'));
            window.location.replace('/home');
          }
          setUser(() => ({
            ...response.data,
          }));
        })
        .catch(function (error) {
          if (error.response.status === 400) {
            toast.warning(t(error.response.data.errors.join('\n')));
          }
          if (error.response.status.status > 400) {
            toast.warning(t('UNKNOWN_ERROR_OCCURRED'));
          }
        });
    },
  });

  sessionStorage.setItem('user', JSON.stringify(user));

  return (
    <>
      <Header />
      <CssVarsProvider>
        <main>
          <ToastContainer />
          <Sheet
            sx={{
              maxWidth: 400,
              mx: 'auto', // margin left & right
              my: 4, // margin top & botom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 'sm',
              boxShadow: 'md',
            }}
            variant="outlined"
          >
            <div>
              <Typography level="h4" component="h1">
                <b>{t('WELCOME')}!</b>
              </Typography>
              <Typography level="body2">{t('SIGN_IN_TO_CONTINUE')}</Typography>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                name="UserName"
                label={t('USERNAME')}
                onChange={formik.handleChange}
                value={formik.values.UserName}
              />
              <TextField
                name="Password"
                type="password"
                label={t('PASSWORD')}
                onChange={formik.handleChange}
                value={formik.values.Password}
              />
              <Button
                sx={{
                  mt: 1, // margin top
                }}
                type="submit"
              >
                {t('LOG_IN')}
              </Button>
              <Typography fontSize="sm" sx={{ alignSelf: 'center' }}>
                {t('DONT_HAVE_AN_ACCOUNT')}?
                <Link to={'/register'}>{' ' + t('SIGN_UP')}</Link>
              </Typography>
            </form>
          </Sheet>
        </main>
      </CssVarsProvider>
    </>
  );
}
