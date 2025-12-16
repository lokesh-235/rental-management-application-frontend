import { useEffect, useState } from "react";
import styles from "./property-card.module.css";
import ImageSlider from "./image-slider";
import PropertyInfo from "./property-info";
import RequestButton from "./request-button";
import OwnerDetails from "./owner-details";
import { getOwnerDetailsByPropertyId, postRequest } from "../../apis/apis";

export default function PropertyCard({ property, onClose }) {
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [loadingOwner, setLoadingOwner] = useState(true);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const isLoggedIn = !!user && user.role === 'TENANT';

  // Fetch owner details
  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        setLoadingOwner(true);
        const res = await getOwnerDetailsByPropertyId(property.propertyId);
        setOwnerDetails(res.data);
      } catch (err) {
        console.error("Failed to fetch owner details", err);
      } finally {
        setLoadingOwner(false);
      }
    };
    fetchOwnerDetails();
  }, [property.propertyId]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  let postTenantRequest = async (message) => {
    const res = await postRequest({
      propertyId : property.propertyId,
      tenantId : user.userId,
      message : message,
    });

    console.log(res.data);
    
    onClose();
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <ImageSlider images={property.images} title={property.title} />

        <PropertyInfo property={property} />

        <RequestButton isLoggedIn={isLoggedIn} postTenantRequest={postTenantRequest}/>

        <OwnerDetails
          ownerDetails={ownerDetails}
          loadingOwner={loadingOwner}
        />
      </div>
    </div>
  );
}
