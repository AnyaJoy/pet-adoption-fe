import React from "react";
import SearchForm from "../Components/Search/SearchForm";
import { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import { useState } from "react/cjs/react.development";
import Loader from "../Components/Loader";
import { getAllPets } from "../Components/RequestsDB";

function Search() {
  const appContext = useContext(AppContext);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    appContext.setLocation("/search");
    getAllPets(appContext.setPetsToDisplay);
    setTimeout(() => {
      setPageLoading(false);
    }, 600);
  }, []);

  return (
    <div className="search-page-wrapper">
      {pageLoading ? (
        <Loader classname="loader" />
      ) : (
        <>
          <div className="service-description-logged-in">
            There are hundreds of pets waiting for a family right now. Let's
            find yours!
          </div>
          <div className="search-form-wrapper">
            <SearchForm />
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
