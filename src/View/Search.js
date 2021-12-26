import React from "react";
import SearchForm from "../Components/Search/SearchForm";
import PetsList from "../Components/PetsList";
import { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";

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
      <div className="pets-list-wrapper">
        <PetsList petsArray={appContext.allPets} cardType="vertical" />
      </div>
    </div>
  );
}

export default Search;
