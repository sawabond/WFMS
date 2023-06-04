import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CardContentFieldItem from '../CardContentFieldItem';
import toHundreds from '../../functions/view-functions';

function Turbine({ turbine, farmId }) {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        display: 'flex',
        width: '70%',
        margin: '1%',
        padding: '3%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <CardMedia
        component="img"
        alt="img"
        image={'https://img.icons8.com/?size=512&id=cIO4ze38MhnH&format=png'}
        height="140"
        width="30%"
        sx={{
          float: 'left',
          margin: '0 1.5%',
          width: '140px',
          backgroundSize: '100% 100%',
        }}
      />
      <CardContent sx={{ width: '35%' }}>
        <Typography
          sx={{
            wordBreak: 'break-all',
          }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {turbine.name}
        </Typography>
        <CardContentFieldItem text={`${t('LATITUDE')}: ${turbine.latitude}`} />
        <CardContentFieldItem
          text={`${t('LONGITUDE')}: ${turbine.longitude}`}
        />
        <CardContentFieldItem
          text={`${t('HEIGHT_METERS')}: ${turbine.heightMeters}`}
        />
        <CardContentFieldItem
          text={`${t('PITCH_ANGLE')}: ${toHundreds(turbine.pitchAngle)}`}
        />
        <CardContentFieldItem
          text={`${t('GLOBAL_ANGLE')}: ${toHundreds(turbine.globalAngle)}`}
        />
        <CardContentFieldItem
          text={`${t('POWER_RATING')}: ${turbine.powerRating} KWT`}
        />
        <CardContentFieldItem
          text={`${t('STATUS')}: ${turbine.statusString}`}
        />
      </CardContent>
      <CardActions
        sx={{
          alignItems: 'right',
        }}
      >
        <Button size="small">
          <Link to={`/wind-farms/${farmId}/turbines/${turbine.id}`}>
            {t('VIEW_DETAILS')}
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default Turbine;
