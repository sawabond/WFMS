import React, { useContext } from 'react';
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { userContext } from '../Contexts/userContext';
import { Navigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import axiosClient from '../api/axiosClient';
import { ToastContainer, toast } from 'react-toastify';

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const initialValues = {
  username: '',
  password: '',
  email: '',
};

const lowercaseRegEx = /(?=.*[a-z])/;
const uppercaseRegEx = /(?=.*[A-Z])/;
const numericRegEx = /(?=.*[0-9])/;
const lengthRegEx = /(?=.{6,})/;

export default function FormRegistration() {
  const { t } = useTranslation();

  let validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        lowercaseRegEx,
        t('Must contain one lowercase alphabetical character!')
      )
      .matches(
        uppercaseRegEx,
        t('Must contain one uppercase alphabetical character!')
      )
      .matches(numericRegEx, t('Must contain one numeric character!'))
      .matches(lengthRegEx, t('Must contain 6 characters!'))
      .required(t('Required!')),
  });

  const { user, setUser } = useContext(userContext);
  const classes = useStyle();

  const onSubmit = (values, { resetForm }) => {
    axiosClient
      .post('/auth/register', {
        headers: {
          'Content-Type': 'application/json',
        },
        username: values.username,
        password: values.password,
        email: values.email,
      })
      .then((response) => {
        let userReturned = response.data.data;
        setUser((prevState) => ({
          ...userReturned,
        }));

        window.location.replace(`/confirm-email/${values.email}`);

        resetForm();

        axiosClient.post(
          `auth/request-email-confirmation?userId=${userReturned.id}
          &callbackUrl=${window.location.origin}/email-confirmed/${userReturned.email}`
        );
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        toast.warning(t(error.response.data.errors.join('\n')));
      });
  };
  sessionStorage.setItem('user', JSON.stringify(user));
  if (user?.token) {
    return <Navigate replace to={'/home'} />;
  }
  return (
    <>
      <Grid
        container
        justifyContent="center"
        style={{ alignItems: 'center', height: '100%' }}
      >
        <Grid item md={6} style={{ margin: '2%' }}>
          <Card className={classes.padding}>
            <CardHeader title={t('REGISTER_FORM')}></CardHeader>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ dirty, isValid, values, handleChange, handleBlur }) => {
                return (
                  <Form>
                    <CardContent>
                      <Grid item container spacing={1} justifyContent="center">
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label={t('USERNAME')}
                            variant="outlined"
                            fullWidth
                            name="username"
                            value={values.username}
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label={t('PASSWORD')}
                            variant="outlined"
                            fullWidth
                            name="password"
                            value={values.password}
                            type="password"
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label={t('EMAIL')}
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={values.email}
                            component={TextField}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        type="Submit"
                        className={classes.button}
                      >
                        {t('REGISTER')}
                      </Button>
                    </CardActions>
                  </Form>
                );
              }}
            </Formik>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
