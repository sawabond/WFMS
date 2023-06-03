import React from 'react';
import Typography from '@mui/material/Typography';

function CardContentFieldItem({ text }) {
  return (
    <Typography
      sx={{
        wordBreak: 'break-all',
      }}
      variant="body2"
      color="text.secondary"
    >
      {text}
    </Typography>
  );
}

export default CardContentFieldItem;
