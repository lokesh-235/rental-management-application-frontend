import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:8080",
});
export const getProperties = () => API.get("/api/properties")

export const verifyLoginDetails = (data) => API.post("/api/users/login",data);

export const getTenantRequests = (ownerId) => API.get(`/api/properties/owner/${ownerId}/requests`);
export const approveRequest = (requestId) => API.put(`/api/properties/owner/${requestId}/approve`);
export const rejectRequest = (requestId) => API.put(`/api/properties/owner/${requestId}/reject`);
export const getTenants = (ownerId) => API.get(`/api/properties/owner/active-rentals/${ownerId}`)