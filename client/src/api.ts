const API_BASE = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE}/categories`);
  return res.json();
};

export const fetchOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`);
  return res.json();
};

export const createProduct = async (data: { name: string; price: number; categoryId: number }) => {
  const res = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createCategory = async (data: { name: string }) => {
  const res = await fetch(`${API_BASE}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createOrder = async (data: { quantity: number; productId: number; userId: number }) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
