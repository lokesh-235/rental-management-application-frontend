import { useEffect, useState } from 'react';
import './search-form.css';
import { searchProperties } from '../../apis/apis';
import { getStates } from '../../apis/statesAPI';

export default function SearchForm({ setProperties }) {

  const [statesData, setStatesData] = useState({});
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    location: "",
    propertyType: "",
    state: "",
    city: "",
    maxRentAmount: ""
  });

  // Load states once
  useEffect(() => {
    const loadStates = async () => {
      const res = await getStates();
      setStatesData(res.data);
    };
    loadStates();
  }, []);

  // When state changes → update cities
  useEffect(() => {
    if (formData.state) {
      setCities(statesData[formData.state] || []);
      setFormData(prev => ({ ...prev, city: "" })); // reset city
    }
  }, [formData.state, statesData]);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchForm = async (e) => {
    e.preventDefault();

    if (
      !formData.state ||
      !formData.city ||
      !formData.propertyType ||
      !formData.maxRentAmount
    ) {
      console.log("empty fields");
      return;
    }

    const res = await searchProperties(formData);
    setProperties(res.data);
    console.log(res.data);
    setFormData({
      location: "",
      propertyType: "",
      state: "",
      city: "",
      maxRentAmount: ""
    });
  };

  return (
    <section className="hero">
      <div className="container text-center">
        <h1>Find Your Perfect Rental</h1>

        <form className="search-form" onSubmit={handleSearchForm}>
          
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleOnChange}
          />

          <select name="propertyType" value={formData.propertyType} onChange={handleOnChange}>
            <option value="">Property Type</option>
            <option value="HOUSE">House</option>
            <option value="FLAT">Flat</option>
            <option value="LAND">Land</option>
          </select>

          {/* STATE DROPDOWN */}
          <select name="state" value={formData.state} onChange={handleOnChange}>
            <option value="">Select State</option>
            {Object.keys(statesData).map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          {/* CITY DROPDOWN */}
          <select name="city" value={formData.city} onChange={handleOnChange} disabled={!cities.length}>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <input
            type="number"
            name="maxRentAmount"
            placeholder="Max Rent"
            value={formData.maxRentAmount}
            onChange={handleOnChange}
          />

          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  );
}
