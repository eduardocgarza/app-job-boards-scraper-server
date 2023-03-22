import React from "react"

import ErrorPage from "pages/ErrorPage/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import HomeRoot from "roots/HomeRoot/HomeRoot";
import HomePage from "pages/HomePage/HomePage";
import MySearchesPage from "pages/MySearchesPage/MySearchesPage";
import InitializeSearchPage from "pages/InitializeSearchPage/InitializeSearchPage";
import SettingsPage from "pages/SettingsPage/SettingsPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "create",
        element: <InitializeSearchPage />
      },
      {
        path: "searches",
        element: <MySearchesPage />
      },
      {
        path: "settings", 
        element: <SettingsPage />
      }
    ]
  }
])