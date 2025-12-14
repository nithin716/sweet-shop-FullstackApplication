import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import bgImage from "../assets/auth-bg.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      const decoded = jwtDecode(token);

      login(token, decoded.role);

      toast.success("Login successful 🎉");
      navigate("/", { replace: true });

    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div
      className="auth-bg"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
      }}
    >
      <div className="auth-card">
        <h2 className="text-center mb-4 fw-bold text-white">
          Welcome Back 🍬
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100 fw-semibold">
            Login
          </button>
        </form>

        <p className="text-center mt-3 text-light">
          New user?{" "}
          <Link to="/register" className="text-warning fw-semibold">
            Register here
          </Link>
        </p>
      </div>

      <style>{`
        .auth-bg {
          min-height: 100vh;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(14px);
          padding: 36px;
          width: 100%;
          max-width: 420px;
          border-radius: 18px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.45);
        }

        .auth-card input {
          background: rgba(255,255,255,0.95);
        }

        .auth-card input:focus {
          box-shadow: 0 0 0 0.2rem rgba(13,110,253,.25);
        }
      `}</style>
    </div>
  );
}

export default Login;
