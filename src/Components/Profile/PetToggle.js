function PetToggle({savedPetsSelected, setSavedPetsSelected}) {
  return (
      <span className="toggler-profile-page">
        <span
          className={`toggle-option-${!savedPetsSelected}`}
          onClick={() => {
            setSavedPetsSelected(false);
          }}
        >
          Pets
        </span>

        <span
          className={`toggle-option-${savedPetsSelected}`}
          onClick={() => {
            setSavedPetsSelected(true);
          }}
        >
          Saved
        </span>
      </span>
  );
}

export default PetToggle;
