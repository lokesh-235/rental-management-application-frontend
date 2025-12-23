import React, { useEffect, useState } from "react";
import { getActiveRentalsByTenantId, makePayment } from "../../../../apis/apis";
import styles from "./current-rentals.module.css";

export default function CurrentRentals({ tenantId }) {
  const [currentRentingProperties, setCurrentRentingProperties] = useState([]);

  // Payment modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedRent, setSelectedRent] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  // Success popup state
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const loadActiveRentalDetails = async () => {
    let res = await getActiveRentalsByTenantId(tenantId);
    setCurrentRentingProperties(res.data);
  };

  const handleOpenPaymentModal = (rent) => {
    setSelectedRent(rent);
    setShowModal(true);
  };

  const handleMakePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    let paymentRequest = {
      rentalId: selectedRent.rentalId,
      amount: selectedRent.monthlyRent,
      paymentMethod: paymentMethod,
    };

    let res = await makePayment(paymentRequest);

    if (res.data.paymentStatus === "SUCCESS") {
      setPaymentSuccess(res.data);
    }

    setShowModal(false);
    setPaymentMethod("");

    loadActiveRentalDetails();
  };

  useEffect(() => {
    loadActiveRentalDetails();
  }, []);

  return (
    <>
      <section className={styles.container}>
        <h3>Current Renting</h3>

        {currentRentingProperties.length === 0 ? (
          <p>No Active Rentals</p>
        ) : (
          currentRentingProperties.map((rent) => (
            <div className={styles.rentBox} key={rent.rentalId}>
              {rent.property.images?.length > 0 && (
                <img
                  className={styles.rentImg}
                  src={`${import.meta.env.VITE_API_URL}/${rent.property.images[0].imageUrl}`}
                  alt="property"
                />
              )}

              <h4>{rent.property.title}</h4>

              <p><b>Type:</b> {rent.property.propertyType}</p>
              <p><b>Address:</b> {rent.property.address}</p>
              <p><b>Monthly Rent:</b> ₹{rent.monthlyRent}</p>
              <p><b>Start Date:</b> {rent.startDate}</p>
              <p><b>Status:</b> {rent.status}</p>

              <button
                className={styles.payBtn}
                onClick={() => handleOpenPaymentModal(rent)}
              >
                Pay Rent
              </button>
            </div>
          ))
        )}
      </section>

      {/* Payment Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>Choose Payment Method</h3>

            <select
              className={styles.selectInput}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Method</option>
              <option value="UPI">UPI</option>
              <option value="CARD">Credit/Debit Card</option>
              <option value="NETBANKING">Net Banking</option>
            </select>

            <button className={styles.confirmBtn} onClick={handleMakePayment}>
              Make Payment
            </button>

            <button
              className={styles.cancelBtn}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Payment Success Popup */}
      {paymentSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successBox}>
            <h3>Payment Successful 🎉</h3>
            <p><b>Payment ID:</b> {paymentSuccess.paymentId}</p>
            <p><b>Amount:</b> ₹{paymentSuccess.amount}</p>
            <p><b>Method:</b> {paymentSuccess.paymentMethod}</p>
            <p><b>Property:</b> {paymentSuccess.propertyTitle}</p>

            <button
              className={styles.closeSuccessBtn}
              onClick={() => setPaymentSuccess(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
