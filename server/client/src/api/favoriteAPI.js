import { $authHost } from './config';

export const createFavoriteAction = async (userId, actionPref) => {
  const { data } = await $authHost.post(
    'api/user/' + userId + '/action/add/' + actionPref,
  );
  return data;
};

export const fetchFavorite = async (userId) => {
  const { data } = await $authHost.get(
    'api/user/' + userId + '/favorite/get/',
    {
      params: {
        userId,
      },
    },
  );
  return data;
};

export const fetchFavoriteAction = async (userId, actionPref) => {
  const { data } = await $authHost.get(
    'api/user/' + userId + '/action/get/' + actionPref,
    {
      params: {
        userId,
        actionPref,
      },
    },
  );
  return data;
};

export const deleteFavoriteAction = async (userId, actionPref) => {
  const data = await $authHost.delete(
    'api/user/' + userId + '/action/delete/',
    {
      params: {
        userId,
        actionPref,
      },
    },
  );
  return data;
};
