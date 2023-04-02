import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "pages/ErrorPage/ErrorPage";
import HomeRoot from "roots/HomeRoot/HomeRoot";
import HomePage from "pages/HomePage/HomePage";
import SettingsPage from "pages/SettingsPage/SettingsPage";
import CreateCampaignPage from "pages/CreateCampaignPage/CreateCampaignPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "create",
        element: <CreateCampaignPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
