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

export default function WindFarmDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const authHeaders = useAuthHeaders();

  const [windFarm, setWindFarm] = useState({});
  const [isLoading, setLoading] = useState(false);
  const headers = useAuthHeaders();

  useEffect(() => {
    setLoading(true);

    axiosClient
      .get(`/WindFarm/${id}`, headers)
      .then((response) => {
        setLoading(false);
        setWindFarm(response.data.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  const classes = useStyle();
  const onSubmit = (values) => {
    axiosClient
      .put(
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
          //notifySuccesCreating();
        }
        if (response.data.error) {
          //notifyWrongCreating();
        }
        //resetForm();
      })
      .catch((error) => console.log(error));
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
            <CardHeader title={t('WIND_FARM')}></CardHeader>
            <Formik
              initialValues={windFarm}
              enableReinitialize
              onSubmit={onSubmit}
            >
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
