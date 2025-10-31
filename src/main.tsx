import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Loading from "./components/loading";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes } from "./router/section";

const router = createBrowserRouter(appRoutes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
