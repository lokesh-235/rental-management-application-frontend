import React from "react";
import "./Home.css";
import NavBar from "../nav-bar/navbar";
import Properties from "../properties/properties";
import SearchForm from "../search-form/search-form";
// Dummy property data


const Home = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <NavBar/>

      {/* Hero Section */}
      {/* <SearchForm/> */}

      {/* Featured Properties */}
      <Properties/>

      {/* Footer */}
      <footer>
        <div className="container text-center">
          &copy; 2025 Rental Management. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
