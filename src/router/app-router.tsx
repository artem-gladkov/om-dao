import { createBrowserRouter } from "react-router-dom";
import {
  ExchangePage,
  ProjectPage,
  ProjectsPage,
  RootLayout,
  StakePage,
} from "../pages";
import { PATHS } from "./constants";

export const appRouter = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: PATHS.ROOT,
        element: <ExchangePage />,
      },
      {
        path: PATHS.STAKE,
        element: <StakePage />,
      },
      {
        path: PATHS.PROJECTS,
        element: <ProjectsPage />,
      },
      {
        path: `${PATHS.PROJECTS}/:symbol`,
        element: <ProjectPage />,
      },
      {
        path: `${PATHS.PROJECTS}/:symbol/:refcode`,
        element: <ProjectPage />,
      },
    ],
  },
]);
