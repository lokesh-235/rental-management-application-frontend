import './search-form.css';

export default function SearchForm(){
  return (
    <section className="hero">
        <div className="container text-center">
          <h1>Find Your Perfect Rental</h1>
          <p>Search flats, houses, or lands available for rent</p>
          <form className="search-form">
            <input type="text" placeholder="Location" />
            <select>
              <option value="">Property Type</option>
              <option>House</option>
              <option>Flat</option>
              <option>Land</option>
            </select>
            <input type="number" placeholder="Max Rent" />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>
  );
}