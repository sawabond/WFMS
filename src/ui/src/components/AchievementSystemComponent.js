import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AchievementSystemComponent({ systems }) {
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
        image={require('../img/no-image.jpg')}
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
          {systems.name}
        </Typography>
        <Typography
          sx={{
            wordBreak: 'break-all',
          }}
          variant="body2"
          color="text.secondary"
        >
          {systems.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          alignItems: 'right',
        }}
      >
        <Button size="small">
          <Link to={`/system-achievements?id=${systems.id}`}>
            {t('VIEW_DETAILS')}
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
