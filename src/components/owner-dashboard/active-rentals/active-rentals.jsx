import { useEffect, useState } from "react";
import { getTenants } from "../../../apis/apis";
import styles from "./active-rentals.module.css";

export default function ActiveRentals({ owner }) {
  const [tenants, setTenants] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function loadTenants() {
    try {
      const res = await getTenants(owner.userId);
      if (res.status === 200) {
        setTenants(res.data);
        setIsLoaded(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (owner?.userId) {
      loadTenants();
    }
  }, [owner?.userId]);

  if (!isLoaded) return <h2>Loading tenants...</h2>;

  return (
    <div className={styles.container}>
      {tenants.map((tenant) => (
        <div key={tenant.tenantId} className={styles.tenantCard}>
          
          {/* Tenant Info */}
          <div className={styles.tenantHeader}>
            <h2>{tenant.fullName}</h2>
            <p>Email: {tenant.email}</p>
            <p>Phone: {tenant.phone}</p>
          </div>

          {/* Rentals */}
          <div className={styles.rentals}>
            {tenant.rentals.map((rental) => (
              <div key={rental.rentalId} className={styles.rentalCard}>
                
                <h3>{rental.property.title}</h3>
                <p className={styles.type}>{rental.property.propertyType}</p>

                <p>
                  📍 {rental.property.address}, {rental.property.city}
                </p>

                <div className={styles.money}>
                  <span>Rent: ₹{rental.monthlyRent}</span>
                  <span>Deposit: ₹{rental.property.depositAmount}</span>
                </div>

                <p>Status: <strong>{rental.status}</strong></p>
                <p>Start Date: {rental.startDate}</p>

                {/* Images */}
                {rental.property.images.length > 0 && (
                  <div className={styles.images}>
                    {rental.property.images.map((img) => (
                      <img
                        key={img.imageId}
                        src={`${import.meta.env.VITE_API_URL}/${img.imageUrl}`}
                        alt="property"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
