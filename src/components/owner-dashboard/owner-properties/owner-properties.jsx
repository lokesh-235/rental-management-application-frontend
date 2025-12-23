import { useEffect, useState } from "react";
import "./owner-properties.css";
import PropertiesList from "./properties-list/properties-list";
import AddOrEditPropertyForm from "./add-edit-property-form/add-or-edit-property-form";
import {editProperty, addProperty, uploadFile, deleteProperty, getPropertiesByOwnerId } from "../../../apis/apis";

export default function OwnerProperties({owner}) {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);

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
    const res = await getPropertiesByOwnerId(owner.userId);
    setProperties(res.data);
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

    function handleFileChange(e) {
    setSelectedFiles([...e.target.files]);
  }



  // Add or Update property
  async function handleSubmit(e) {
    e.preventDefault();

    const res = editingProperty 
    ? await editProperty(editingProperty.propertyId,{ ...formData, ownerId: owner.userId }) 
    : await addProperty({ ...formData, ownerId: owner.userId });

    const savedProperty = res.data;

    if (selectedFiles.length > 0) {
    const formDataImages = new FormData();

    selectedFiles.forEach(file => {
      formDataImages.append("file", file);
    });

    // let res = await fetch(
    //   `http://localhost:8080/api/properties/images/upload/${savedProperty.propertyId}`,
    //   {
    //     method: "POST",
    //     body: formDataImages
    //   }
    // );

    let res = await uploadFile(formDataImages,savedProperty.propertyId);
  }
  
    setSelectedFiles([]);
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

    // await fetch(`http://localhost:8080/api/properties/${id}`, {
    //   method: "DELETE"
    // });
    const res = await deleteProperty(id);

    await loadProperties();
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
      <PropertiesList properties={properties} handleEdit={handleEdit} handleDelete={handleDelete}/>

      {/** Add/Edit Form Modal */}
      {showForm && (
        <AddOrEditPropertyForm 
            formData={formData} 
            setFormData={setFormData}
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            editingProperty={editingProperty} 
            setShowForm={setShowForm}
            handleFileChange={handleFileChange}
        />
      )}

    </div>
  );
}
