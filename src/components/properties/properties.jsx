import { useEffect, useState } from 'react';
import './properties.css';
import { getProperties } from '../../apis/apis';
import SearchForm from '../search-form/search-form';
import PropertyCard from '../property-card/property-card';
import { connectWebSocket, disconnectWebSocket } from '../../web-scokets/refresh-properties';


export default function Properties() {

  const [properties, setProperties] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isViewDetails,setIsViewDetails] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  async function loadProperties() {
    const res = await getProperties();

    if (res.status === 200) {
      setProperties(res.data);
      setIsLoaded(true);
    }
  }

  useEffect(() => {

    loadProperties();

    connectWebSocket(() => {
      loadProperties();
    });

    return () => {
      disconnectWebSocket();
    };
  }, []);

  let handleViewDetails = () => {
    //  console.log('view details');
    setIsViewDetails(true);
  }

  return (
    <>
    <SearchForm setProperties = {setProperties}/>

    <section className="featured-properties container">
      <h2>Properties</h2>

      <div className="property-grid">
        {properties.map((property) => (
          <div key={property.propertyId} className="property-cards">

            {/* IMAGE HANDLING */}
            <img
              src={
                property.images && property.images.length > 0
                 ? `${API_URL}/`+property.images[0].imageUrl
                  : "property.jpg"
              }
              alt={property.title}
            />
            {/* <div>{JSON.stringify(property.images)}</div> */}
            <div className="property-info">
              <h3>{property.title}</h3>
              <p>{property.address}, {property.city}, {property.state}</p>

              <p className="price">₹{property.rentAmount} / month</p>

              <button onClick={handleViewDetails}>View Details</button>

              {isViewDetails && <PropertyCard property={property}     onClose={() => setIsViewDetails(false)}/>}
            </div>
          </div>
        ))}
      </div>

      {!isLoaded && <h1>Loading...</h1>}
    </section>

    </>
  );
}
