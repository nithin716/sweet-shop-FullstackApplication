import api from "../api/axiosConfig";

export const getAllSweets = () => api.get("/sweets");
export const purchaseSweet = (id, qty) =>
  api.post(`/sweets/${id}/purchase?quantity=${qty}`);
