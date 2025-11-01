import { lazy } from "react";
import MainLayout from "@/layouts/main-layout";
import ProtectedRoute from "./protected-route";
import { Navigate } from "react-router-dom";

const Login = lazy(() => import("@/pages/login"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Deposit = lazy(() => import("@/pages/deposit"));
const Withdraw = lazy(() => import("@/pages/withdraw"));
const History = lazy(() => import("@/pages/history"));
const Settings = lazy(() => import("@/pages/settings"));
const WatchList = lazy(() => import("@/pages/watch-list"));
const NotFound = lazy(() => import("@/pages/page-not-found"));

export const RoutesSection = [
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "deposit",
        element: <Deposit />,
      },
      {
        path: "withdraw",
        element: <Withdraw />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "watch-list",
        element: <WatchList />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },

  { path: "*", element: <NotFound /> },
];
