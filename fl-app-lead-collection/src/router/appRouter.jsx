import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "pages/ErrorPage/ErrorPage";
import HomeRoot from "roots/HomeRoot/HomeRoot";
import HomePage from "pages/HomePage/HomePage";
import MySearchesPage from "pages/MySearchesPage/MySearchesPage";
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
        path: "searches",
        element: <MySearchesPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
