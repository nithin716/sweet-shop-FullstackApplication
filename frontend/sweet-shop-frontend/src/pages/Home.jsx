import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import heroImage from "../assets/hero-banner.jpg";

function Home() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const loadSweets = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/sweets");
      setSweets(res.data || []);
    } catch (err) {
      setError("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  const searchSweets = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/sweets/search", {
        params: {
          name: search || undefined,
          category: category || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        },
      });
      setSweets(res.data || []);
    } catch (err) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const purchaseSweet = async (id) => {
    const qty = prompt("Enter quantity to purchase:");
    if (!qty || qty <= 0) return;

    try {
      await api.post(`/sweets/${id}/purchase`, null, {
        params: { quantity: qty },
      });
      alert("Purchase successful 🎉");
      loadSweets();
    } catch (err) {
      alert("Purchase failed");
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(
            rgba(0,0,0,0.55),
            rgba(0,0,0,0.55)
          ), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "340px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container text-white">
          <h1 className="fw-bold display-6">
            Fresh & Delicious Sweets 🍬
          </h1>
          <p className="lead mb-3">
            Authentic taste · Premium quality · Best prices
          </p>
          <button
            className="btn btn-warning btn-lg fw-semibold"
            onClick={() =>
              window.scrollTo({ top: 360, behavior: "smooth" })
            }
          >
            Shop Now
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: "#f1f7ff" }}>
        <div className="container my-5 py-4">
          <h2 className="text-center fw-bold mb-4">
            🍬 Available Sweets
          </h2>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Search & Filters</h5>

              <div className="row g-3">
                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Sweet name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Min ₹"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>

                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max ₹"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>

                <div className="col-md-2 d-grid">
                  <button className="btn btn-primary" onClick={searchSweets}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center my-5">
              <div className="spinner-border text-primary"></div>
              <p className="mt-2">Loading sweets...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

          <div className="row">
            {!loading && sweets.length === 0 && (
              <p className="text-center text-muted">
                No sweets found
              </p>
            )}

            {sweets.map((s) => (
              <div className="col-md-4 mb-4" key={s.id}>
                <div className="card h-100 shadow-sm border-0 sweet-card">
                  <div className="card-body">
                    <h5 className="fw-bold">{s.name}</h5>
                    <p><strong>Category:</strong> {s.category}</p>
                    <p><strong>Price:</strong> ₹{s.price}</p>
                    <p>
                      <strong>Stock:</strong>{" "}
                      {s.quantity > 0 ? (
                        <span className="badge bg-success ms-1">
                          {s.quantity}
                        </span>
                      ) : (
                        <span className="badge bg-danger ms-1">
                          Out of Stock
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="card-footer bg-white border-0">
                    <button
                      className="btn btn-success w-100"
                      disabled={s.quantity === 0}
                      onClick={() => purchaseSweet(s.id)}
                    >
                      {s.quantity === 0 ? "Out of Stock" : "Purchase"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hover animation */}
      <style>{`
        .sweet-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .sweet-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
      `}</style>
    </>
  );
}

export default Home;
