import styles from "./property-card.module.css";

export default function OwnerDetails({ ownerDetails, loadingOwner }) {
  return (
    <div className={styles.ownerSection}>
      <h3>Owner Details</h3>
      {loadingOwner ? (
        <p className={styles.loading}>Loading owner details...</p>
      ) : ownerDetails ? (
        <>
          <p><strong>Name:</strong> {ownerDetails.fullName}</p>
          <p><strong>Email:</strong> {ownerDetails.email}</p>
          <p><strong>Phone:</strong> {ownerDetails.phone}</p>
        </>
      ) : (
        <p className={styles.error}>Owner details unavailable</p>
      )}
    </div>
  );
}
