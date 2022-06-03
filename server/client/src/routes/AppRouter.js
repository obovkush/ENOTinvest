import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import HomePage from '../pages/HomePage/HomePage';

const AppRouter = () => {
  // const user = {};
  // user.isAuth = true;
  // console.log(user);
  return (
    <Routes>
      {/* {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))} */}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<HomePage />}
        />
    </Routes>
  );
};

export default AppRouter;
