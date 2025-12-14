import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-3">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <span className="fs-4 me-2">🍬</span>
        <div className="d-flex flex-column lh-sm">
          <span className="fw-bold fs-5">Sweet Shop</span>
          <small className="text-secondary">Delight in every bite</small>
        </div>
      </Link>

      <div className="ms-auto d-flex align-items-center gap-2">
        {isAuthenticated && (
          <Link className="nav-pill" to="/">
            Home
          </Link>
        )}

        {isAuthenticated && role === "ADMIN" && (
          <Link className="nav-pill admin-pill" to="/admin">
            Admin Dashboard
          </Link>
        )}

        {isAuthenticated && role && (
          <span
            className={`role-badge ${
              role === "ADMIN" ? "role-admin" : "role-user"
            }`}
          >
            {role}
          </span>
        )}

        {!isAuthenticated ? (
          <>
            <Link className="nav-pill outline" to="/login">
              Login
            </Link>
            <Link className="nav-pill outline" to="/register">
              Register
            </Link>
          </>
        ) : (
          <button className="nav-pill danger" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      <style>{`
        .nav-pill {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .nav-pill:hover {
          background-color: rgba(255,255,255,0.1);
          color: #fff;
        }

        .outline {
          border: 1px solid #6c757d;
        }

        .outline:hover {
          background-color: #6c757d;
        }

        .admin-pill {
          background-color: #ffc107;
          color: #000;
        }

        .admin-pill:hover {
          background-color: #ffca2c;
          color: #000;
        }

        .danger {
          background-color: #dc3545;
        }

        .danger:hover {
          background-color: #bb2d3b;
        }

        .role-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .role-admin {
          background-color: #dc3545;
          color: #fff;
        }

        .role-user {
          background-color: #0dcaf0;
          color: #000;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
