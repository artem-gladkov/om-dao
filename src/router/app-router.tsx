import { createBrowserRouter } from "react-router-dom";
import { ExchangePage, ProjectsPage, RootLayout, StakePage } from "../pages";
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
    ],
  },
]);
