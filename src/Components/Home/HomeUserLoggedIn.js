import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import SearchForm from "../Search/SearchForm";
import PetsList from "../PetsList";

function HomeUserLoggedIn() {
  const appContext = useContext(AppContext);

  return (
    <div className="home-page-logged-in-wrapper">
      <div className="welcome-header-logged-in">
        Welcome, {appContext.user.first_name} {appContext.user.last_name}!
      </div>
      <div className="service-description-logged-in">
        There are hundreds of pets waiting for a family right now. Let's find
        yours!
      </div>
      <div className="search-form-wrapper">
        <SearchForm />
        <div className="under-search-text">
          You can check out all the pets you've saved in your{" "}
          <Link to="/profile" className="link-to-profile">
            profile
          </Link>
          !
        </div>
      </div>
      <div className="pets-list-wrapper">
        <PetsList petsArray={appContext.allPets} cardType="vertical" />
      </div>
    </div>
  );
}

export default HomeUserLoggedIn;
