import styles from "./property-card.module.css";

export default function PropertyInfo({ property }) {
  return (
    <>
      <h2 className={styles.title}>{property.title}</h2>
      <p className={styles.type}>{property.propertyType}</p>
      <div className={styles.info}>
        <p><strong>Rent:</strong> ₹{property.rentAmount}</p>
        <p><strong>Deposit:</strong> ₹{property.depositAmount}</p>
        <p><strong>Location:</strong> {property.city}, {property.state}</p>
        <p><strong>Description:</strong> {property.description}</p>
      </div>
    </>
  );
}
