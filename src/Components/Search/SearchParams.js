import Select from "react-select";
import { useEffect, useState } from "react";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "grey",
    padding: 10,
    background: state.isSelected ? "#F9399CFF" : "white",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

const optionsType = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
];

const optionsStatus = [
  { value: "Adopted", label: "Adopted" },
  { value: "Available", label: "Available" },
  { value: "Fostered", label: "Fostered" },
];

const optionsWeight = [
  { value: "3", label: "<3kg" },
  { value: "3-10", label: "3-10kg" },
  { value: "10", label: ">10kg" },
];

const optionsHeight = [
  { value: "20", label: "Short" },
  { value: "20-40", label: "Medium" },
  { value: "40", label: "Tall" },
];

function SearchParams({
  advancedSearchSelected,
  typeSelected,
  setType,
  statusSelected,
  setStatus,
  weightSelected,
  setWeight,
  heightSelected,
  setHeight,
}) {
  return (
    <>
      {advancedSearchSelected ? (
        <span className="serach-params">
          <Select
            defaultValue={typeSelected}
            placeholder="Type"
            styles={customStyles}
            onChange={setType}
            options={optionsType}
          />
          <Select
            defaultValue={statusSelected}
            placeholder="Status"
            styles={customStyles}
            onChange={setStatus}
            options={optionsStatus}
          />
          <Select
            defaultValue={weightSelected}
            placeholder="Weight"
            styles={customStyles}
            onChange={setWeight}
            options={optionsWeight}
          />
          <Select
            defaultValue={heightSelected}
            placeholder="Height"
            styles={customStyles}
            onChange={setHeight}
            options={optionsHeight}
          />
        </span>
      ) : (
        <span id="basic-search-option">
          <Select
            defaultValue={typeSelected}
            placeholder="Type"
            styles={customStyles}
            onChange={setType}
            options={optionsType}
          />
        </span>
      )}
    </>
  );
}

export default SearchParams;
