import React from "react";
import { useState } from "react";
import PetToggle from "./PetToggle";
import PetsGroups from "./PetsGroups";

function UserPets({ header, userViewedByAdmin }) {
  const [savedPetsSelected, setSavedPetsSelected] = useState(true);

  return (
    <div className="myPets-wrapper">
      <div className="quote-and-toggle-wrapper">
        <span className="my-pets-header">{header}</span>
        <PetToggle
          savedPetsSelected={savedPetsSelected}
          setSavedPetsSelected={setSavedPetsSelected}
        />
      </div>

      {savedPetsSelected ? (
        <PetsGroups
          petsGroup="savedPets"
          messageForAdmin={"User doesn't have any pets saved."}
          messageForUser={"Currently you don't have any pets saved."}
          userViewedByAdmin={userViewedByAdmin}
        />
      ) : (
        <PetsGroups
          petsGroup="fosteredPets"
          messageForAdmin={"User is not fostering any pets."}
          messageForUser={"Currently you are not fostering any pets."}
          userViewedByAdmin={userViewedByAdmin}
        />
      )}
    </div>
  );
}

export default UserPets;
