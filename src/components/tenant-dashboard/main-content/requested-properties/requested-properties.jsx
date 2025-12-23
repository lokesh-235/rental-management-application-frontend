import { useEffect, useState } from "react";
import { getTenantRequestsByTenantId } from "../../../../apis/apis";
import "./requested-properties.css";

export default function RequestedProperties({ tenantId }) {
  const [tenantRequests, setTenantRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTenantRequests = async () => {
    try {
      const res = await getTenantRequestsByTenantId(tenantId);
      setTenantRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTenantRequests();
  }, []);

  if (loading) return <p className="loading">Loading requested properties...</p>;

  if (tenantRequests.length === 0)
    return <p className="empty">No requested properties found</p>;

  return (
    <div className="requested-container">
      <h1 className="page-title">Requested Properties</h1>

      <div className="cards-container">
        {tenantRequests.map((request) => (
          <div className="property-card" key={request.requestId}>
            <div className="card-header">
              <h3>{request.property.title}</h3>
              <span
                className={`status ${request.status.toLowerCase()}`}
              >
                {request.status}
              </span>
            </div>

            <p className="type">{request.property.propertyType}</p>

            <p className="address">{request.property.address}</p>

            <div className="amounts">
              <div>
                <span>Rent</span>
                <strong>₹{request.property.rentAmount}</strong>
              </div>
              <div>
                <span>Deposit</span>
                <strong>₹{request.property.depositAmount}</strong>
              </div>
            </div>

            <p className="message">
              <strong>Message:</strong> {request.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
