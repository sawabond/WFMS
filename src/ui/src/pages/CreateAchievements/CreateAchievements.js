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
import { TextField } from 'formik-material-ui';
import Header from '../../components/Header';
import axios from 'axios';
import { userContext } from '../../Contexts/userContext';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

//Data
const initialValues = {
  name: '',
  description: '',
};
export default function CreateAchievements() {
  const { t } = useTranslation();

  const { user } = useContext(userContext);
  const classes = useStyle();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = (values, { resetForm }) => {
    axios
      .post(
        'https://localhost:7184/api/Achievement',
        {
          achievementSystemId: searchParams.get('id'),
          name: values.name,
          description: values.description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + StorageUser.token,
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        }
        resetForm();
      });
  };
  const StorageUser = JSON.parse(sessionStorage.getItem('user'));
  console.log(StorageUser);
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
            <CardHeader title={t('ENTER_ACHIEVEMENT_INFORMATION')}></CardHeader>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ values }) => {
                return (
                  <Form>
                    <CardContent style={{ justifyContent: 'center' }}>
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
                            label={t('DESCRIPTION')}
                            variant="outlined"
                            fullWidth
                            name="description"
                            value={values.description}
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
                        {t('ADD_NEW_ACHIEVEMENT')}
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
