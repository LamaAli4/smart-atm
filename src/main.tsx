import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Loading from "./components/loading";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RoutesSection } from "./router/section";
import { AuthProvider } from "./context/auth-context";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter(RoutesSection);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
        />
      </Suspense>
    </AuthProvider>
  </React.StrictMode>
);
