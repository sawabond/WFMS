import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
export default function AchievementComponent({ achievement }) {
  return (
    <Card
      sx={{
        width: '30%',
        maxWidth: '30%',
        minWidth: '30%',
        margin: '1%',
        flex: '1 1 150px',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={require('../img/no-image.jpg')}
          height="140"
          alt="img"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ overflowWrap: 'break-word' }}
          >
            {achievement.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ overflowWrap: 'break-word' }}
          >
            {achievement.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
