import "../../Styles/SearchForm.css";
import React from "react";
import { useState, useContext, useEffect } from "react/cjs/react.development";
import Loader from "../Loader";
import SearchToggle from "./SearchToggle";
import SearchParams from "./SearchParams";
import { searchPets } from "../RequestsDB";
import AppContext from "../../Context/AppContext";
import PetsList from "../PetsList";
import { Link } from "react-router-dom";

function SearchForm() {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [advancedSearchSelected, selectAdvancedSearch] = useState(false);
  const [name, setName] = useState("");
  const [typeSelected, setType] = useState([]);
  const [statusSelected, setStatus] = useState([]);
  const [weightSelected, setWeight] = useState([]);
  const [heightSelected, setHeight] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    // if (
    //   name != "" ||
    //   typeSelected != false ||
    //   weightSelected != false ||
    //   heightSelected != false ||
    //   statusSelected != false
    // ) {
    setLoading(true);

    //for UX
    setTimeout(() => {
      const searchParameters = {
        name: `%${name}%`, //syntax for sql (but protected from injections)
        type: typeSelected.value,
        adoption_status: statusSelected.value,
        weight: weightSelected.value,
        height: heightSelected.value,
      };

      searchPets(searchParameters, appContext.setPetsToDisplay).catch((err) => {
        console.log(err);
      });

      setLoading(false);
    }, 600);
    // }
  };

  function submitOnEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleSearch();
    }
  }

  useEffect(() => {
    if (
      name != "" ||
      typeSelected != false ||
      weightSelected != false ||
      heightSelected != false ||
      statusSelected != false
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [name, typeSelected, statusSelected, weightSelected, heightSelected]);

  return (
    <>
      <div className="toggle-wrapper">
        <SearchToggle
          advancedSearchSelected={advancedSearchSelected}
          selectAdvancedSearch={selectAdvancedSearch}
        />
        <SearchParams
          advancedSearchSelected={advancedSearchSelected}
          typeSelected={typeSelected}
          setType={setType}
          statusSelected={statusSelected}
          setStatus={setStatus}
          weightSelected={weightSelected}
          setWeight={setWeight}
          heightSelected={heightSelected}
          setHeight={setHeight}
        />
      </div>

      <form onSubmit={handleSearch} className="search-input-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Search by pet name (or leave it empty)"
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></input>

        {loading ? (
          <Loader classname={"search-loader"} />
        ) : (
          <button
            type="submit"
            className={`search-button-${!buttonDisabled}`}
            disabled={buttonDisabled}
          >
            Search
          </button>
        )}
      </form>

      {appContext.user && (
        <div className="under-search-text">
          You can check out all the pets you've saved in your{" "}
          <Link to="/profile" className="link-to-profile">
            profile
          </Link>
          !
        </div>
      )}

      <div className="pets-list-wrapper">
        {appContext.petsToDisplay.length != 0 ? (
          <PetsList petsArray={appContext.petsToDisplay} cardType="vertical" />
        ) : (
          <div>No pets found with given criteria :(</div>
        )}
      </div>
    </>
  );
}

export default SearchForm;
