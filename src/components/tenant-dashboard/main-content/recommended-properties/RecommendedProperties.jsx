import React from "react";
import SearchForm from "../../../search-form/search-form";
import Properties from "../../../properties/properties";


export default function RecommendedProperties() {
  return (
    <section>
      <h3>Recommended For You</h3>

      <SearchForm />
      <Properties />
    </section>
  );
}
