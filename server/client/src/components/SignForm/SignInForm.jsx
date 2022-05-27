import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { login } from '../../api/userAPI';
import { HOME_ROUTE, SIGNUP_ROUTE } from '../../utils/consts';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const labelSX = { mb: 0 };

const SignIn = () => {
  const user = useSelector((store) => store.user);

  console.log('user', user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Некорректный email')
            .max(255, 'Максимум 32 символа')
            .required('Обязательное поле'),
          password: Yup.string()
            .max(255, 'Максимум 255 символов')
            .required('Обязательное поле'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setLoading(true);
          try {
            console.log(values);
            await login(values.email, values.password)
              .then((data) => {
                console.log('dataFromServerLogin', data);
                dispatch({
                  type: 'SET_USER',
                  payload: data,
                });
              })
              .then(() => navigate(HOME_ROUTE));
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.log('errorFromServerLogin', err);
            setStatus({ success: false });
            setErrors({ submit: err.response.data.description });
            setSubmitting(false);
            setLoading(false);
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
                    <LockOutlinedIcon fontSize="large" color="warning" />
                  </Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <InputLabel htmlFor="email-login" sx={labelSX}>
                    Email
                  </InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Введите email"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login" sx={labelSX}>
                    Пароль
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-login"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 3, mb: 1 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        sx={{ display: 'none' }}
                        // size="small"
                      />
                    }
                    label={
                      <Typography
                        variant="p"
                        sx={{ fontSize: '16px', display: 'none' }}
                      >
                        Запомнить
                      </Typography>
                    }
                  />
                  <Link
                    variant="p"
                    sx={{ fontSize: '16px' }}
                    component={RouterLink}
                    to={SIGNUP_ROUTE}
                    color="#f07800"
                    underline="none"
                  >
                    Нет аккаунта?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <LoadingButton
                  disableElevation
                  disabled={!values.email || !values.password || isSubmitting}
                  fullWidth
                  color="warning"
                  size="large"
                  // onClick={handleClick}
                  loading={loading}
                  loadingPosition="start"
                  type="submit"
                  variant="contained"
                >
                  {loading ? 'Входим' : 'Войти'}
                </LoadingButton>
              </Grid>
              {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Войти с помощью</Typography>
                </Divider>
              </Grid> */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignIn;
