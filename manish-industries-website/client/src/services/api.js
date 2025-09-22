import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "/api";

const api = axios.create({
  baseURL,
});

// Attach JWT token for admin routes
api.interceptors.request.use((config) => {
  // Only attach token for /admin routes
  if (config.url && config.url.startsWith("/admin")) {
    const token = localStorage.getItem("admin_jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Service: Get all services
export function getServices() {
  return api.get("/services").then((res) => res.data);
}

// Gallery: Get paged images
export function getGallery(page = 1, limit = 30) {
  return api.get(`/gallery?page=${page}&limit=${limit}`).then((res) => res.data);
}

// Contact: Post contact form
export function postContact(data) {
  return api.post("/contact", data).then((res) => res.data);
}

// Admin: Login
export function adminAuth(username, password) {
  return api.post("/admin/login", { username, password }).then((res) => {
    if (res.data.token) {
      localStorage.setItem("admin_jwt", res.data.token);
    }
    return res.data;
  });
}