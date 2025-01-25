import { createBrowserRouter } from "react-router-dom";
import Entry from "../pages/Entry";
import ErrorPage from "../pages/ErrorPage";
import { paths } from "./paths";
import Auth from "../pages/Auth";
import Main from "../pages/Main";
import UserGames from "../pages/UserGames";
import { useSelector } from "react-redux";
import CreatingPage from "../pages/CreatingPage";

const PrivateRoute = ({ element }) => {
  const { isAuth } = useSelector((state) => state.user);

  if (isAuth) return element;

  return <ErrorPage />;
};

export const router = createBrowserRouter([
  {
    path: paths.ENTRY,
    element: <Entry />,
    errorElement: <ErrorPage />,
  },
  {
    path: paths.AUTH,
    element: <Auth />,
  },
  {
    path: paths.MAIN,
    element: <PrivateRoute element={<Main />} />,
  },
  {
    path: paths.MY_GAMES,
    element: <PrivateRoute element={<UserGames />} />,
  },
  {
    path: paths.GAMES_CREATION,
    element: <PrivateRoute element={<CreatingPage />} />,
  },
]);

//TODO: add loaders
