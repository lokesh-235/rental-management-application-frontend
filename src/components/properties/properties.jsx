import { useEffect, useState } from 'react';
import './properties.css';
import { getProperties } from '../../apis/apis';

export default function Properties() {

  const [properties, setProperties] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function loadProperties() {
    const res = await getProperties();

    if (res.status === 200) {
      setProperties(res.data);
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <section className="featured-properties container">
      <h2>Properties</h2>

      <div className="property-grid">
        {properties.map((property) => (
          <div key={property.propertyId} className="property-card">

            {/* IMAGE HANDLING */}
            <img
              src={
                property.images && property.images.length > 0
                  ? property.images[0]
                  : "property.jpg"
              }
              alt={property.title}
            />

            <div className="property-info">
              <h3>{property.title}</h3>
              <p>{property.address}, {property.city}, {property.state}</p>

              <p className="price">₹{property.rentAmount} / month</p>

              <button>View Details</button>
            </div>
          </div>
        ))}
      </div>

      {!isLoaded && <h1>Loading...</h1>}
    </section>
  );
}
