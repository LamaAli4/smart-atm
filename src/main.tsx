import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Loading from "./components/loading";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RoutesSection } from "./router/section";
import { AuthProvider } from "./context/auth-context";
import { WatchlistProvider } from "@/context/watchlist-context";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/theme-provider";

const router = createBrowserRouter(RoutesSection);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <WatchlistProvider>
          <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
          </Suspense>
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
        </WatchlistProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
