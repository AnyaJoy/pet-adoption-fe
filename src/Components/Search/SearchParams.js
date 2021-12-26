import Select from "react-select";
import { useState } from "react";

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
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
];

const optionsStatus = [
  { value: "adopted", label: "Adopted" },
  { value: "available", label: "Available" },
];

const optionsWeight = [
  { value: "smaller3", label: "<3kg" },
  { value: "3to5", label: "3-5kg" },
  { value: "bigger5", label: ">5kg>" },
];

const optionsHeight = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "big", label: "Big" },
];

function SearchParams() {
  const [typeSelected, setType] = useState(null);
  const [statusSelected, setStatus] = useState(null);
  const [weightSelected, setWeight] = useState(null);
  const [heightSelected, setHeight] = useState(null);

  return (
    <>
      <Select
        placeholder="Type"
        styles={customStyles}
        onChange={typeSelected}
        options={optionsType}
      />
      <Select
        placeholder="Status"
        styles={customStyles}
        onChange={statusSelected}
        options={optionsStatus}
      />
      <Select
        placeholder="Weight"
        styles={customStyles}
        onChange={weightSelected}
        options={optionsWeight}
      />
      <Select
        placeholder="Height"
        styles={customStyles}
        onChange={heightSelected}
        options={optionsHeight}
      />
    </>
  );
}

export default SearchParams;
