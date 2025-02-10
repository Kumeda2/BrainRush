import { createBrowserRouter, useParams } from "react-router-dom";
import { paths } from "./paths";
import { useSelector } from "react-redux";
import Entry from "../pages/Entry";
import Auth from "../pages/Auth";
import Main from "../pages/Main";
import UserGames from "../pages/UserGames";
import CreatingPage from "../pages/CreatingPage";
import GameRoom from "../pages/GameRoom";
import WaitingRoom from "../pages/WaitingRoom";
import PreGameRoom from "../pages/PreGameRoom";
import ResultsPage from "../pages/ResultsPage";
import ErrorPage from "../pages/ErrorPage";

const PrivateRoute = ({ element }) => {
  const { isAuth } = useSelector((state) => state.user);

  if (!isAuth) return <ErrorPage />;

  return element;
};

const HostPrivateRoute = ({ element }) => {
  const { role } = useParams();
  const { isAuth } = useSelector((state) => state.user);

  if (role === ":admin" && isAuth) return element;
  else if (role === ":player") return element;

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
  {
    path: paths.GAME_SETTINGS,
    element: <PrivateRoute element={<CreatingPage />} />,
  },
  {
    path: paths.PRE_GAME_ROOM,
    element: <PrivateRoute element={<PreGameRoom />} />,
  },
  {
    path: paths.WAITING_ROOM,
    element: <WaitingRoom />,
  },
  {
    path: paths.GAME_ROOM,
    element: <HostPrivateRoute element={<GameRoom />} />,
  },
  {
    path: paths.RESULTS,
    element: <ResultsPage />,
  },
]);
