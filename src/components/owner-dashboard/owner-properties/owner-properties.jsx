import { useEffect, useState } from "react";
import "./owner-properties.css";

export default function OwnerProperties({owner}) {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    rentAmount: "",
    depositAmount: "",
    propertyType: "HOUSE",
  });

  // Fetch owner properties
  async function loadProperties() {
    const res = await fetch(`http://localhost:8080/api/properties/owner/${owner.userId}`); // ownerId dynamic
    const data = await res.json();
    setProperties(data);
  }

  useEffect(() => {
    loadProperties();
  }, []);

  // Form input handler
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Add or Update property
  async function handleSubmit(e) {
    e.preventDefault();

    const method = editingProperty ? "PUT" : "POST";
    const url = editingProperty
      ? `http://localhost:8080/api/properties/${editingProperty.propertyId}`
      : "http://localhost:8080/api/properties";

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...formData,ownerId : owner.userId}),
    });

    setShowForm(false);
    setEditingProperty(null);
    setFormData({
      title: "",
      description: "",
      address: "",
      city: "",
      state: "",
      rentAmount: "",
      depositAmount: "",
      propertyType: "HOUSE",
    });

    loadProperties();
  }

  // Delete Property
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await fetch(`http://localhost:8080/api/properties/${id}`, {
      method: "DELETE"
    });

    loadProperties();
  }

  // Edit Property
  function handleEdit(property) {
    setEditingProperty(property);
    setFormData(property);
    setShowForm(true);
  }

  return (
    <div className="owner-properties">

      <div className="header-row">
        <h2>Manage Properties</h2>
        <button
          className="primary-btn"
          onClick={() => {
            setEditingProperty(null);
            setShowForm(true);
          }}
        >
          + Add Property
        </button>
      </div>

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

      {/** Add/Edit Form Modal */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">

            <h3>{editingProperty ? "Edit Property" : "Add New Property"}</h3>

            <form onSubmit={handleSubmit}>
              <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required ></textarea>

              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
              <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />

              <input type="number" name="rentAmount" placeholder="Rent Amount" value={formData.rentAmount} onChange={handleChange} required />
              <input type="number" name="depositAmount" placeholder="Deposit Amount" value={formData.depositAmount} onChange={handleChange} required />

              <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
                <option value="HOUSE">HOUSE</option>
                <option value="FLAT">FLAT</option>
                <option value="LAND">LAND</option>
              </select>

              <div className="modal-actions">
                <button className="primary-btn" type="submit">
                  {editingProperty ? "Update" : "Add"}
                </button>
                <button className="cancel-btn" type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
