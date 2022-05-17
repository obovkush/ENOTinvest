import { $authHost, $host } from './config';
import jwt_decode from 'jwt-decode';

export const registration = async (name, email, password) => {
  const { data } = await $host.post('api/user/registration', {
    name,
    email,
    password,
  });
  localStorage.setItem('token', data.accessToken);
  return jwt_decode(data.accessToken);
};

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.accessToken);
  return jwt_decode(data.accessToken);
};

export const logout = async () => {
  const { data } = await $authHost.post('api/user/logout');
  return data;
};

// export const check = async () => {
//   const { data } = await $authHost.get('api/user/auth');
//   localStorage.setItem('token', data.accessToken);
//   return jwt_decode(data.accessToken);
// };

export const checkAuth = async () => {
  const { data } = await $authHost.get(`api/user/refresh`);
  console.log(data);
  localStorage.setItem('token', data.accessToken);
  return jwt_decode(data.accessToken);
  // finally {
  //   this.setLoading(false);
  // }
};
