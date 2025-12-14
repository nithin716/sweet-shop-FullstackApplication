import { purchaseSweet } from "../services/sweetService";

function SweetCard({ sweet }) {
  const handlePurchase = () => {
    purchaseSweet(sweet.id, 1)
      .then(() => alert("Purchased successfully"))
      .catch(() => alert("Purchase failed"));
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card p-3">
        <h5>{sweet.name}</h5>
        <p>Category: {sweet.category}</p>
        <p>Price: ₹{sweet.price}</p>
        <p>Stock: {sweet.quantity}</p>

        <button
          className="btn btn-success"
          disabled={sweet.quantity === 0}
          onClick={handlePurchase}
        >
          Purchase
        </button>
      </div>
    </div>
  );
}

export default SweetCard;
