import "../../Styles/SearchToggle.css";
import SearchParams from "./SearchParams";

function SearchToggle({advancedSearchSelected, selectAdvancedSearch}) {
  return (
    <div className="toggle-wrapper">
      <span className="toggler">
        <span
          className={`toggle-option-${!advancedSearchSelected}`}
          onClick={() => {
            selectAdvancedSearch(false);
          }}
        >
          Basic
        </span>

        <span
          className={`toggle-option-${advancedSearchSelected}`}
          onClick={() => {
            selectAdvancedSearch(true);
          }}
        >
          Advanced
        </span>
      </span>
      {advancedSearchSelected && (
          <span className="serach-params">
            <SearchParams />
          </span>
        )}
    </div>
  );
}

export default SearchToggle;
