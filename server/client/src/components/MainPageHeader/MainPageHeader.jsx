import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function MainPageHeader({ elem }) {
  return (
    <Card sx={{ width: '32%', backgroundColor: elem.color, textAlign: 'center', color: 'white' }}>
      <CardContent>
        {elem.icon}
        <Typography variant="h3" component="div">
          {elem.info}
        </Typography>
        <Typography variant="body2">
          {elem.additionalInfo}
        </Typography>
      </CardContent>
    </Card>
  );
}
