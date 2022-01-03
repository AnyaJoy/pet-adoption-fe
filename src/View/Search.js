import React from "react";
import SearchForm from "../Components/Search/SearchForm";
import PetsList from "../Components/PetsList";
import { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import { useState } from "react/cjs/react.development";

function Search() {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.setLocation("/search");
  }, []);

  return (
    <div className="search-page-wrapper">
      <div className="service-description-logged-in">
        There are hundreds of pets waiting for a family right now. Let's find
        yours!
      </div>
      <div className="search-form-wrapper">
        <SearchForm />
      </div>
    </div>
  );
}

export default Search;
