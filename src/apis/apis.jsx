import axios from "axios";

const API = axios.create({
    baseURL : import.meta.env.VITE_API_URL
,
});
export const getProperties = () => API.get("/api/properties")

export const verifyLoginDetails = (data) => API.post("/api/users/login",data);
export const logOut = () => API.post("/api/users/logout")

export const getTenantRequests = (ownerId) => API.get(`/api/owner/${ownerId}/requests`);
export const approveRequest = (requestId) => API.put(`/api/owner/${requestId}/approve`);
export const rejectRequest = (requestId) => API.put(`/api/owner/${requestId}/reject`);
export const getTenants = (ownerId) => API.get(`/api/owner/active-rentals/${ownerId}`);
export const addProperty = (data) => API.post(`api/properties`,data);
export const editProperty = (propertyId,data) => API.put(`/api/properties/${propertyId}`,data);
export const deleteProperty = (propertyId) => API.delete(`/api/properties/${propertyId}`);
export const uploadFile = (file,propertyId) => API.post(`/api/properties/images/upload/${propertyId}`,file);
export const getPropertiesByOwnerId = (ownerId) => API.get(`/api/properties/owner/${ownerId}`);
export const searchProperties = (data) => API.post(`/api/properties/searchProperties`,data);

export const getOwnerDetailsByPropertyId = (propertyId) => API.get(`/api/properties/property/owner/${propertyId}`);

export const postRequest = (data) => API.post(`api/tenant/requests`,data);
export const getTenantRequestsByTenantId = (tenantId) => API.get(`api/tenant/requests/${tenantId}`);
export const getActiveRentalsByTenantId = (tenantId) => API.get(`api/tenant/active-rentals/${tenantId}`);

export const makePayment = (data) => API.post(`api/payments/make-payment`,data);