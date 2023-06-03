import React, { useState, useEffect } from 'react';
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
import { TextField } from 'formik-material-ui';
import Header from '../../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import axiosClient from '../../api/axiosClient';
import useAuthHeaders from '../../hooks/useAuthHeaders';
import { useParams } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function UserDetails() {
  const { t } = useTranslation();
  const { userId } = useParams();
  const authHeaders = useAuthHeaders();

  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      axiosClient
        .get(`User/${userId}`, authHeaders)
        .then((response) => {
          setUser(response.data.data);
        })
        .catch((err) => toast.warn(err));

      setLoading(false);
    };

    fetchData();
  }, []);

  const classes = useStyle();

  const onSubmit = (values, { resetForm, setValues }) => {
    axiosClient
      .patch(`/User/${userId}`, values, authHeaders)
      .then((response) => {
        if (response) {
          toast.success(t('SUCCESSFULLY_UPDATED_USER_WITH_ID') + ` ${user.id}`);
          resetForm();
          setValues(values);
        }
      })
      .catch((error) => {
        toast.warn(error.response.data.errors.join('\n'));
        resetForm();
      });
  };

  const removeUser = () => {
    axiosClient
      .delete(`/User/${userId}`, authHeaders)
      .then((response) => {
        if (response) {
          toast.success(t('SUCCESSFULLY_DELETED_USER_WITH_ID') + ` ${user.id}`);
          window.location.replace('/users');
        }
      })
      .catch((error) => {
        toast.warn(error.response.data.errors.join('\n'));
      });
  };

  return (
    <>
      <Header />
      <Grid
        container
        justifyContent="center"
        style={{ alignItems: 'center', height: '100%' }}
      >
        <Grid item md={6} style={{ margin: '2%' }}>
          <Card className={classes.padding}>
            <CardHeader title={t('USER')}></CardHeader>
            <Formik initialValues={user} enableReinitialize onSubmit={onSubmit}>
              {({ values }) => {
                return (
                  <Form>
                    <CardContent>
                      <Grid item container spacing={1} justifyContent="center">
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label={t('ID')}
                            variant="outlined"
                            fullWidth
                            name="longitude"
                            value={values.id}
                            component={TextField}
                            disabled
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label={t('USERNAME')}
                            variant="outlined"
                            fullWidth
                            name="userName"
                            value={values.userName}
                            component={TextField}
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="Submit"
                        className={classes.button}
                      >
                        {t('UPDATE_USER_DATA')}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={removeUser}
                      >
                        {t('REMOVE_USER')}
                      </Button>
                    </CardActions>
                  </Form>
                );
              }}
            </Formik>
          </Card>
          <ToastContainer />
        </Grid>
      </Grid>
    </>
  );
}
