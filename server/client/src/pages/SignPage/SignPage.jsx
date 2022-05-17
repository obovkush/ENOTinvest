import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid, Card, CardHeader, Typography } from '@mui/material';

import SignIn from '../../components/SignForm/SignInForm';
import SignUp from '../../components/SignForm/SignUpForm';

import { SIGNIN_ROUTE } from '../../utils/consts';

// header style
const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
  fontSize: '20px',
};

function SignPage() {
  const location = useLocation();
  const isSignInRoute = location.pathname === SIGNIN_ROUTE;

  return (
    <>
      <Box sx={{ minHeight: '80vh' }}>
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
            <Card sx={{ maxWidth: 465, p: 3, mt: 5, mx: 'auto', boxShadow: 3 }}>
              {isSignInRoute ? (
                <>
                  <CardHeader
                    sx={headerSX}
                    title={<Typography variant="h5">Вход в аккаунт</Typography>}
                  />
                  <SignIn />
                </>
              ) : (
                <>
                  <CardHeader
                    sx={headerSX}
                    title={
                      <Typography variant="h5">Создание аккаунта</Typography>
                    }
                  />
                  <SignUp />
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SignPage;
