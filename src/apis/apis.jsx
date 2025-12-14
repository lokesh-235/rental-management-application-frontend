import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:8080",
});
export const getProperties = () => API.get("/api/properties")

export const verifyLoginDetails = (data) => API.post("/api/users/login",data);
export const logOut = () => API.post("/api/users/logout")

export const getTenantRequests = (ownerId) => API.get(`/api/properties/owner/${ownerId}/requests`);
export const approveRequest = (requestId) => API.put(`/api/properties/owner/${requestId}/approve`);
export const rejectRequest = (requestId) => API.put(`/api/properties/owner/${requestId}/reject`);
export const getTenants = (ownerId) => API.get(`/api/properties/owner/active-rentals/${ownerId}`);
export const addProperty = (data) => API.post(`api/properties`,data);
export const editProperty = (propertyId,data) => API.put(`api/properties/${propertyId}`,data);
export const deleteProperty = (propertyId) => API.delete(`api/properties/${propertyId}`);
export const uploadFile = (file,propertyId) => API.post(`api/properties/images/upload/${propertyId}`,file);
export const getPropertiesByOwnerId = (ownerId) => API.get(`api/properties/owner/${ownerId}`);
export const searchProperties = (data) => API.post(`api/properties/searchProperties`,data);