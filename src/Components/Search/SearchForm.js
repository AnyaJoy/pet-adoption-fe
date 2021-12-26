import "../../Styles/SearchForm.css";
import React from "react";
import { useState } from "react/cjs/react.development";
import Loader from "../Loader";
import SearchToggle from "./SearchToggle";

function SearchForm() {
  const [searchInput, setSearchInput] = useState("");
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [advancedSearchSelected, selectAdvancedSearch] = useState(false);

  const handleSearch = () => {};

  return (
    <>
      <SearchToggle advancedSearchSelected={advancedSearchSelected} selectAdvancedSearch={selectAdvancedSearch}/>
      <div className="search-input-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        ></input>
        {loading ? (
          <Loader classname={"search-loader"} />
        ) : (
          <button onClick={handleSearch} className={`search-button-${true}`}>
            Search
          </button>
        )}
      </div>
    </>
  );
}

export default SearchForm;
