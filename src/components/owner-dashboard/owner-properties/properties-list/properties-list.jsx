import { useState } from 'react';
import './properties-list.css';
import PropertyCard from '../../../property-card/property-card';

export default function PropertiesList({properties,handleEdit,handleDelete}){

  const [currentClickedProperty,setCurrentClickedProperty] = useState();

  const [showCard,setShowCard] = useState(false);

  let handleClickedProperty = (currentProperty) => {
    setCurrentClickedProperty(currentProperty);
    setShowCard(true);
  }

    return (
        <>
         {/** Property List */}
      <div className="property-list" >
        {properties.length === 0 ? (
          <p>No properties added yet.</p>
        ) : (
          properties.map((p) => (
            <div key={p.propertyId} className="property-card" onClick={()=>{handleClickedProperty(p)}}>
              <h3>{p.title}</h3>
              <p>{p.address}, {p.city}, {p.state}</p>
              <p>Rent: ₹{p.rentAmount}</p>
              <p>Deposit: ₹{p.depositAmount}</p>
              <p>Type: {p.propertyType}</p>

              <div className="actions" onClick={(e) => e.stopPropagation()}>
                <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(p.propertyId)}>Delete</button>
              </div>
            </div>
          ))
        )}

        {showCard && <PropertyCard property={currentClickedProperty} onClose={() => setShowCard(false)} isOwner={true}/>}

      </div>
      </>
    )
}