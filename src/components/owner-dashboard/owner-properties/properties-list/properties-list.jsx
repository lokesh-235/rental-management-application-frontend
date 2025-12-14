export default function PropertiesList({properties,handleEdit,handleDelete}){
    return (
        <>
         {/** Property List */}
      <div className="property-list">
        {properties.length === 0 ? (
          <p>No properties added yet.</p>
        ) : (
          properties.map((p) => (
            <div key={p.propertyId} className="property-card">
              <h3>{p.title}</h3>
              <p>{p.address}, {p.city}, {p.state}</p>
              <p>Rent: ₹{p.rentAmount}</p>
              <p>Deposit: ₹{p.depositAmount}</p>
              <p>Type: {p.propertyType}</p>

              <div className="actions">
                <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(p.propertyId)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      </>
    )
}