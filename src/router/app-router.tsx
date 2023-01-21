import {createBrowserRouter, Navigate} from "react-router-dom";
import {
  ExchangePage,
  ProjectPage,
  ProjectsPage,
  RootLayout,
  StakePage,
  ReferralPage,
} from "../pages";
import { PATHS } from "./constants";
import React from "react";

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
      {
        path: `${PATHS.REFERRAL}/:refcode`,
        element: <ReferralPage />,
      },
      {
        path: "*",
        element: <Navigate to={PATHS.ROOT} replace />
      },
    ],
  },
]);
