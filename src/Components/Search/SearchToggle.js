import "../../Styles/Search.css";

function SearchToggle({ advancedSearchSelected, selectAdvancedSearch }) {
  return (
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
  );
}

export default SearchToggle;
