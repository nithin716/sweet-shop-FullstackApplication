export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const isAdmin = () => {
  return localStorage.getItem("role") === "ADMIN";
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
