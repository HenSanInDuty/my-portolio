import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Introduce from "../pages/Introduce/Introduce";
import Guide from "../pages/Guide/Guide";
import Test from "../pages/Test/Test";
import Survey from "../pages/Survey/Survey";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/introduce",
    element: <Introduce />,
  },
  {
    path: "/guide",
    element: <Guide />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/survey",
    element: <Survey />,
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
]);
