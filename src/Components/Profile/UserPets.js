import React from "react";
import { useState } from "react";
import PetToggle from "./PetToggle";
import PetsGroups from "./PetsGroups";

function UserPets({ header, userType, user }) {
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
          userType={userType}
          user={user}
          messageForAdmin={"User doesn't have any pets saved."}
          messageForUser={"Currently you don't have any pets saved."}
          savedPetsSelected={savedPetsSelected}
        />
      ) : (
        <PetsGroups
          userType={userType}
          user={user}
          messageForAdmin={"User is not fostering any pets."}
          messageForUser={"Currently you are not fostering any pets."}
          savedPetsSelected={savedPetsSelected}
        />
      )}
    </div>
  );
}

export default UserPets;
