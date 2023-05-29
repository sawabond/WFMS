import React from 'react';
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

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const initialValues = {
  name: '',
  location: '',
  capacity: 0,
};

export default function CreateWindFarm() {
  const { t } = useTranslation();
  const authHeaders = useAuthHeaders();

  const notifySuccesCreating = () =>
    toast.success(t('WINDFARM_HAS_BEEN_CREATED') + '!');
  const notifyWrongCreating = () =>
    toast.warning(t('WINDFARM_HAS_NOT_BEEN_CREATED') + '!');
  const classes = useStyle();
  const onSubmit = (values, { resetForm }) => {
    axiosClient
      .post(
        '/WindFarm',
        {
          name: values.name,
          location: values.location,
          capacity: values.capacity,
        },
        authHeaders
      )
      .then((response) => {
        if (response) {
          notifySuccesCreating();
        }
        if (response.data.error) {
          notifyWrongCreating();
        }
        resetForm();
      })
      .catch((error) => notifyWrongCreating);
  };

  const StorageUser = JSON.parse(sessionStorage.getItem('user'));

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
            <CardHeader title={t('WIND_FARM')}></CardHeader>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ values }) => {
                return (
                  <Form>
                    <CardContent>
                      <Grid item container spacing={1} justifyContent="center">
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label={t('NAME')}
                            variant="outlined"
                            fullWidth
                            name="name"
                            value={values.name}
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label={t('LOCATION')}
                            variant="outlined"
                            fullWidth
                            name="location"
                            value={values.location}
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label={t('CAPACITY')}
                            variant="outlined"
                            fullWidth
                            name="capacity"
                            type="number"
                            value={values.capacity}
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
                        {t('ADD_NEW_WINDFARM')}
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
