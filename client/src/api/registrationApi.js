import axios from "axios";
import useLoadingStore from "../store/loadingStore";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
  withCredentials: true,
});

// Request Interceptor
API.interceptors.request.use((config) => {
  const { setLoading } = useLoadingStore.getState();
  setLoading(true);
  return config;
});

// Response Interceptor
API.interceptors.response.use(
  (response) => {
    const { setLoading } = useLoadingStore.getState();
    setLoading(false);
    return response;
  },
  (error) => {
    const { setLoading } = useLoadingStore.getState();
    setLoading(false);
    return Promise.reject(error);
  }
);

// Submit registration
export const submitRegistration = (data) => {
  return API.post("/api/registrations", data);
};

export const submitBrandHonoring = (data) => {
  return API.post("/api/brand-honoring", data);
};

export const getBrandHonorings = () => {
  return API.get("/api/brand-honoring");
};

export const submitBusinessPresentation = (data) => {
  return API.post("/api/business-presentation", data);
};

export const getBusinessPresentations = () => {
  return API.get("/api/business-presentation");
};

export const submitPanelDiscussion = (data) => {
  return API.post("/api/panel-discussion", data);
};

export const getPanelDiscussions = () => {
  return API.get("/api/panel-discussion");
};

export const submitProductLaunch = (data) => {
  return API.post("/api/product-launch", data);
};

export const getProductLaunches = () => {
  return API.get("/api/product-launch");
};

// Get all registrations (admin)
export const getAllRegistrations = (params = {}) => {
  return API.get("/api/registrations", { params });
};

// Get registration by ID
export const getRegistrationById = (id) => {
  return API.get(`/api/registrations/${id}`);
};

// Export registrations to Excel
export const exportRegistrations = (params = {}) => {
  return API.get("/api/registrations/export/excel", { 
    params,
    responseType: 'blob'
  });
};

// Get registration statistics
export const getRegistrationStats = () => {
  return API.get("/api/registrations/stats/overview");
};

// Razorpay helpers (Visitor registration payment)
export const getRazorpayKey = () => {
  return API.get("/api/payment/key");
};

export const createRazorpayOrder = (data) => {
  return API.post("/api/payment/order", data);
};

export default API;
