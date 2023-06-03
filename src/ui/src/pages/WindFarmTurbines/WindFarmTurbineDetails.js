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
import { Select, TextField } from 'formik-material-ui';
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

const runningModes = ['Normal', 'Optimized', 'Offline'];

export default function WindFarmTurbineDetails() {
  const { t } = useTranslation();
  const { farmId, turbineId } = useParams();
  const authHeaders = useAuthHeaders();

  const [turbine, setTurbine] = useState({});
  const [windState, setWindState] = useState({});
  const [isLoading, setLoading] = useState(false);
  const headers = useAuthHeaders();

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      axiosClient
        .get(`Monitoring/wind-state`, headers)
        .then((response) => {
          setWindState(response.data);
        })
        .catch((err) => console.warn(err));

      axiosClient
        .get(`/WindFarm/${farmId}/Turbines/${turbineId}`, headers)
        .then((response) => {
          setTurbine(response.data.data);
        })
        .catch((err) => console.warn(err));

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
    axiosClient
      .patch(
        `/WindFarm/${farmId}/Turbines/${turbineId}/${patchRoute}`,
        {},
        authHeaders
      )
      .then((response) => {
        if (response) {
          toast.success(response.data);
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
        <TurbineWithWind
          turbineAngle={turbine.globalAngle}
          windAngle={windState.globalAngle}
          pitchAngle={turbine.pitchAngle}
          mode={turbine.statusString}
        />
      </Grid>
    </>
  );
}
