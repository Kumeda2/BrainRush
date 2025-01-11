import { createBrowserRouter } from "react-router-dom";
import Entry from "../pages/Entry";
import ErrorPage from "../pages/ErrorPage";
import { paths } from "./paths";
import Auth from "../pages/Auth";
import Main from "../pages/Main";

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
    element: <Main />,
  },
]);
