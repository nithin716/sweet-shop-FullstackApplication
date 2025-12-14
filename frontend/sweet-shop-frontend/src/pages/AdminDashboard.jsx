import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function AdminDashboard() {
  const [sweets, setSweets] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  // Load sweets
  const loadSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  // Add or Update Sweet
  const submitSweet = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    if (editId) {
      await api.put(`/sweets/${editId}`, payload);
      setEditId(null);
    } else {
      await api.post("/sweets", payload);
    }

    setForm({ name: "", category: "", price: "", quantity: "" });
    loadSweets();
  };

  // Edit Sweet
  const editSweet = (sweet) => {
    setEditId(sweet.id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
  };

  // Delete Sweet
  const deleteSweet = async (id) => {
    if (!window.confirm("Delete this sweet?")) return;
    await api.delete(`/sweets/${id}`);
    loadSweets();
  };

  // Restock Sweet
  const restockSweet = async (id) => {
    const qty = prompt("Enter restock quantity:");
    if (!qty) return;

    await api.post(`/sweets/${id}/restock?quantity=${Number(qty)}`);
    loadSweets();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin Dashboard</h2>

      {/* Add / Update Form */}
      <form onSubmit={submitSweet} className="mb-4">
        <h5>{editId ? "Update Sweet" : "Add Sweet"}</h5>

        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value === "" ? "" : Number(e.target.value),
            })
          }
          required
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity: e.target.value === "" ? "" : Number(e.target.value),
            })
          }
          required
        />

        <button className="btn btn-success">
          {editId ? "Update Sweet" : "Add Sweet"}
        </button>

        {editId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditId(null);
              setForm({ name: "", category: "", price: "", quantity: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Sweet List */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sweets.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.category}</td>
              <td>₹{s.price}</td>
              <td>{s.quantity}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => editSweet(s)}
                >
                  Update
                </button>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => restockSweet(s.id)}
                >
                  Restock
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteSweet(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {sweets.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No sweets available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
