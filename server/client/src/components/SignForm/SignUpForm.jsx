import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

// formik
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
// import AnimateButton from 'components/@extended/AnimateButton';
import {
  strengthColor,
  strengthIndicator,
} from '../../utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { SIGNIN_ROUTE } from '../../utils/consts';

const labelSX = { mb: -2 };

const SignUp = () => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string()
            .max(255)
            .required('* Поле обязательно к заполнению'),
          email: Yup.string()
            .email('Некорректный email')
            .max(255, 'Максимум 255 символов')
            .required('* Поле обязательно к заполнению'),
          password: Yup.string()
            .max(255, 'Максимум 255 символов')
            .required('* Поле обязательно к заполнению'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">
                    <AssignmentIndOutlinedIcon />
                  </Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup" sx={labelSX}>
                    Имя
                  </InputLabel>
                  <OutlinedInput
                    id="firstname-signup"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Введите имя"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                    inputProps={{}}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup" sx={labelSX}>
                    Email
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-signup"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Введите email"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup" sx={labelSX}>
                    Пароль
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Введите пароль"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 3 }}
                >
                  <FormControl sx={{ width: '50%', mt: 1 }}>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      alignItems="center"
                    >
                      <Grid item>
                        <Box
                          sx={{
                            bgcolor: level?.color,
                            width: 100,
                            height: 6,
                            borderRadius: '7px',
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </FormControl>
                  <Link
                    variant="p"
                    sx={{ fontSize: '16px' }}
                    component={RouterLink}
                    to={SIGNIN_ROUTE}
                    color="primary"
                  >
                    Есть аккаунт?
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Регистрируясь, вы принимаете &nbsp;
                  <br />
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Условия сервиса
                  </Link>
                  &nbsp; и &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Политику конфиденциальности
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                {/* <AnimateButton> */}
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Создать аккаунт
                </Button>
                {/* </AnimateButton> */}
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Войти с помощью</Typography>
                </Divider>
              </Grid>
              {/* <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
