import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import logo from '../../Drawer/logo.png';

// Чтобы область hover была на всю карточку нужно на спрятанном тут button (см. в панели разработчика) поставить height 100%, а на title поставить высоту в 100%
export default function ActionAreaCard({ elem }) {

  const cardStyle = {
    mt: 1,
    mr: 2,
    maxWidth: 200,
  }

  return (
    <Card sx={cardStyle}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={elem.enclosure?.url || logo}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {elem.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
