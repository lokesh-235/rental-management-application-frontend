import { useEffect, useState } from "react";
import { getTenantRequests, approveRequest, rejectRequest } from "../../../apis/apis";
import "./tenant-requests.css";
import Requests from "../requests/requests";

export default function TenantRequests({ owner }) {

    const [requests, setRequests] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadRequests = async () => {
        try {
            const response = await getTenantRequests(owner.userId);

            if (response.status === 200) {
                setRequests(response.data);
                setIsLoaded(true);
            } else {
                alert("Owner not found");
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    
    useEffect(() => {
        loadRequests();
    }, []);

    return (
        <div className="tenant-requests-container">
            <h1 className="heading">Tenant Requests</h1>

            {!isLoaded ? (
                <h2 className="loading">Loading...</h2>
            ) : requests.length === 0 ? (
                <h2 className="no-data">No requests found</h2>
            ) : (<Requests requests = {requests} loadRequests = {loadRequests}/>)}
        </div>
    );
}
