import { SIGNIN_ROUTE, SIGNUP_ROUTE, HOME_ROUTE } from '../utils/consts';
import SignPage from '../pages/SignPage/SignPage';
import HomePage from '../pages/HomePage/HomePage';

// export const authRoutes = [
//   {
//     path: SOME_ROUTE,
//     Component: SomePage,
//   },
// ];

export const publicRoutes = [
  {
    path: SIGNIN_ROUTE,
    Component: SignPage,
  },
  {
    path: SIGNUP_ROUTE,
    Component: SignPage,
  },
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },
  // {
  //   path: ACTION_ROUTE,
  //   Component: Info,
  // },
  // {
  //   path: `${ACTION_ROUTE}/:id`,
  //   Component: Toy,
  // },
];
