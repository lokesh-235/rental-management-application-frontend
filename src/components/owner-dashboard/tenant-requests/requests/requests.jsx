import { approveRequest, rejectRequest } from "../../../../apis/apis";

export default function Requests({requests,loadRequests}) {

    const handleApprove = async (requestId) => {
            const res = await approveRequest(requestId);
            if (res.status === 200) {
                alert("Request approved");
                loadRequests();
            }
        };
    
        const handleReject = async (requestId) => {
            const res = await rejectRequest(requestId);
            if (res.status === 200) {
                alert("Request rejected");
                loadRequests();
            }
        };
    

    return (
        requests.map(req => (
                    <div className="request-card" key={req.requestId}>
                        <div className="request-header">
                            <p className="request-message">{req.message}</p>
                            <span className={`status ${req.status.toLowerCase()}`}>
                                {req.status}
                            </span>
                        </div>

                        <div className="property-section">
                            <p><b>🏠 {req.property.title}</b></p>
                            <p>{req.property.address}, {req.property.city}</p>
                            <p>Rent: <b>₹{req.property.rentAmount}</b></p>
                            <p>Deposit: <b>₹{req.property.depositAmount}</b></p>
                        </div>

                        {req.status === "PENDING" && (
                            <div className="action-btns">
                                <button className="approve-btn" 
                                    onClick={() => handleApprove(req.requestId)}>
                                    Approve
                                </button>
                                <button className="reject-btn" 
                                    onClick={() => handleReject(req.requestId)}>
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )
}