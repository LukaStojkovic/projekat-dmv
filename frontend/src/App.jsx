import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Spinner from "./components/Spinner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) return <Spinner />;

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!authUser ? <RegisterPage /> : <Navigate to="/" />}
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
