import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        {/* Root route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Register />
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
