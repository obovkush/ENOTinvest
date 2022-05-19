import { Box, Grid, Card, CardHeader, Typography } from '@mui/material';

import StockAccordion from '../../components/StockAccordion/StockAccordion';

function StockPage() {
  return (
    <>
      <Box sx={{ minHeight: '80vh' }}>
        <h1>Stock Page</h1>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          sx={{
            height: '100%',
          }}
        >
          <Grid
            item
            md={12}
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: {
                xs: 'calc(100vh - 134px)',
                md: 'calc(100vh - 112px)',
              },
            }}
          >
            <StockAccordion />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default StockPage;
