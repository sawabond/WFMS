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
import { useParams } from 'react-router-dom';
import { InputAdornment } from '@mui/material';

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function CreateWindFarmTurbine() {
  const { t } = useTranslation();
  const { farmId } = useParams();
  const authHeaders = useAuthHeaders();

  const classes = useStyle();

  const onSubmit = (values, { resetForm, setValues }) => {
    axiosClient
      .post(`/WindFarm/${farmId}/Turbines/`, values, authHeaders)
      .then((response) => {
        if (response) {
          toast.success(t('TURBINE_CREATED'));
        }
        resetForm();
        setValues(values);
      })
      .catch((error) => toast.error(error));
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
            <Formik initialValues={{}} enableReinitialize onSubmit={onSubmit}>
              {({ values }) => {
                return (
                  <Form>
                    <CardContent>
                      <Grid item container spacing={1} justifyContent="center">
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            required
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
                            required
                            type="number"
                            label={t('HEIGHT_METERS')}
                            variant="outlined"
                            fullWidth
                            name="heightMeters"
                            component={TextField}
                            inputProps={{ step: '0.00001' }}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  m
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            required
                            type="number"
                            label={t('LONGITUDE')}
                            variant="outlined"
                            fullWidth
                            name="longitude"
                            component={TextField}
                            inputProps={{ step: '0.00001' }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            required
                            type="number"
                            label={t('LATITUDE')}
                            variant="outlined"
                            fullWidth
                            name="latitude"
                            component={TextField}
                            inputProps={{ step: '0.00001' }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            required
                            type="number"
                            label={t('POWER_RATING')}
                            variant="outlined"
                            fullWidth
                            name="powerRating"
                            component={TextField}
                            inputProps={{
                              step: '0.00001',
                            }}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  KWT
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            required
                            type="number"
                            label={t('GLOBAL_ANGLE')}
                            variant="outlined"
                            fullWidth
                            name="globalAngle"
                            component={TextField}
                            inputProps={{ step: '0.00001' }}
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
                        {t('CREATE_TURBINE')}
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
