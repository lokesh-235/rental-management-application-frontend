import React from "react";

export default function CurrentRentals() {
  return (
    <section>
      <h3>Current Renting</h3>

      <div className="rent-box">
        <h4>Flat A-202, Skyline Residency</h4>
        <p><b>Monthly Rent:</b> ₹12,000</p>
        <p><b>Due Date:</b> 5th of every month</p>
        <button className="pay-btn">Pay Rent</button>
      </div>
    </section>
  );
}
