import { Box, Grid, Card, CardHeader, Typography } from '@mui/material';

import StockAccordion from '../../components/StockAccordion/StockAccordion';

function StockPage() {
  return (
    <>
      <Box>
        <Grid item xs={12} md={11.7} pt={10}>
        <StockAccordion />
        </Grid>
      </Box>
    </>
  );
}

export default StockPage;
