import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import Loading from "@/components/loading";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLogged, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isLogged && !loading) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
