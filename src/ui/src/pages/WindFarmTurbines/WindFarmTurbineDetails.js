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
import TurbineWithWind from '../../components/Turbine/TurbineWithWind';

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function WindFarmTurbineDetails() {
  const { t } = useTranslation();
  const { farmId, turbineId } = useParams();
  const authHeaders = useAuthHeaders();

  const [turbine, setTurbine] = useState({});
  const [conditionsState, setConditionsState] = useState({});
  const [isLoading, setLoading] = useState(false);
  const headers = useAuthHeaders();

  const loadTurbine = () => {
    axiosClient
      .get(`/WindFarm/${farmId}/Turbines/${turbineId}`, headers)
      .then((response) => {
        setTurbine(response.data.data);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    loadTurbine();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      axiosClient
        .get(`Monitoring/wind-state`, headers)
        .then((response) => {
          setConditionsState(response.data);
        })
        .catch((err) => console.warn(err));

      loadTurbine();

      setLoading(false);
    };

    fetchData();
    const interval = setInterval(() => fetchData(), 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const classes = useStyle();
  const onSubmit = (values) => {
    axiosClient
      .put(
        `/WindFarm/${farmId}/Turbines/${turbineId}`,
        { TODO: 'Replace it with real data' },
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

  const runNormalized = () => patchTurbine('run-normalized');
  const runOptimized = () => patchTurbine('run-optimized');
  const turnOff = () => patchTurbine('turn-off');

  const patchTurbine = (patchRoute) => {
    return axiosClient
      .patch(
        `/WindFarm/${farmId}/Turbines/${turbineId}/${patchRoute}`,
        {},
        authHeaders
      )
      .then((response) => {
        if (response) {
          toast.success(response.data);
          if (patchRoute === 'turn-off') {
            setTurbine((prev) => {
              return {
                ...prev,
                statusString: 'Offline',
              };
            });
          } else if (patchRoute === 'run-normalized') {
            setTurbine((prev) => {
              return {
                ...prev,
                statusString: 'Normal',
              };
            });
          } else if (patchRoute === 'run-optimized') {
            setTurbine((prev) => {
              return {
                ...prev,
                statusString: 'Optimized',
              };
            });
          }
        }
      })
      .catch((error) => toast.warn(error.response.data.join('\n')));
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
            <CardHeader title={t('TURBINE')}></CardHeader>
            <Formik
              initialValues={turbine}
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
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label={t('HEIGHT_METERS')}
                            variant="outlined"
                            fullWidth
                            name="heightMeters"
                            value={values.heightMeters}
                            component={TextField}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label={t('LONGITUDE')}
                            variant="outlined"
                            fullWidth
                            name="longitude"
                            type="number"
                            value={values.longitude}
                            component={TextField}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label={t('LATITUDE')}
                            variant="outlined"
                            fullWidth
                            name="latitude"
                            value={values.latitude}
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
                        {t('UPDATE_TURBINE_DATA')}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="Submit"
                        className={classes.button}
                        onClick={runNormalized}
                      >
                        {t('RUN_NORMALIZED')}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="Submit"
                        className={classes.button}
                        onClick={runOptimized}
                      >
                        {t('RUN_OPTIMIZED')}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="Submit"
                        className={classes.button}
                        onClick={() =>
                          window.location.replace(`${turbineId}/dashboard`)
                        }
                      >
                        {t('VIEW_STATISTICS')}
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="Submit"
                        className={classes.button}
                        onClick={turnOff}
                      >
                        {t('TURN_OFF')}
                      </Button>
                    </CardActions>
                  </Form>
                );
              }}
            </Formik>
          </Card>
          <ToastContainer />
        </Grid>
        <TurbineWithWind turbine={turbine} conditionsState={conditionsState} />
      </Grid>
    </>
  );
}
