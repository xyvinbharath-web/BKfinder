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

// Register summit attendee
export const registerSummitAttendee = (data) => {
  return API.post("/api/summit/register", data);
};

// Get all summit attendees
export const getSummitAttendees = () => {
  return API.get("/api/summit/attendees");
};

// Get summit attendee by ID
export const getSummitAttendeeById = (id) => {
  return API.get(`/api/summit/attendees/${id}`);
};

export default API;
