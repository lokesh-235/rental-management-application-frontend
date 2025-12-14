export default function AddOrEditPropertyForm({formData,setFormData,handleChange,handleSubmit,editingProperty,setShowForm,handleFileChange}){
    return (
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

              <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
              />

              
              <div className="modal-actions">
                <button className="primary-btn" type="submit">
                  {editingProperty ? "Update" : "Add"}
                </button>
                <button className="cancel-btn" type="button" onClick={() => {setFormData({});setShowForm(false);}}>
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
    );
}