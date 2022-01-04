import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Pictures/logo.png";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import PetsList from "../PetsList";
import { getSavedPetsByUserId, getOwnedPetsByUserId } from "../RequestsDB";

function PetsGroups({
  userType,
  messageForAdmin,
  messageForUser,
  savedPetsSelected,
  user,
}) {
  const appContext = useContext(AppContext);
  const [message, setMessage] = useState();
  const [petsToDisplay, setPetsToDisplay] = useState([]);

  useEffect(() => {
    if (userType == "User") {
      setMessage(messageForUser);
    } else {
      setMessage(messageForAdmin);
    }
  }, [userType, savedPetsSelected]);

  useEffect(() => {
    setPetsToDisplay(false);
    try {
      if (savedPetsSelected) {   //fetching saved pets
        getSavedPetsByUserId(user.id, appContext.headersConfig)
          .then((savedPets) => {
            if (savedPets.length != 0) {
              setPetsToDisplay(savedPets);
            } else {
              setPetsToDisplay(false);
            }
          })
      } else {
        getOwnedPetsByUserId(user.id, appContext.headersConfig) //fetching owned pets
          .then((ownedPets) => {
            if (ownedPets.length != 0) {
              setPetsToDisplay(ownedPets);
            } else {
              setPetsToDisplay(false);
            }
          })
      }
    } catch(err){console.log(err)}
  }, [user, savedPetsSelected]);

  return (
    <>
      {petsToDisplay ? (
        <div className="saved-pets-wrapper">
          <PetsList petsArray={petsToDisplay} cardType="horizontal" />
        </div>
      ) : (
        <>
          <div className="saved-pets-empty">
            <img src={logo} className="logo-profile-page" />
            <div className="no-pets-header">{message}</div>
          </div>
          <div className={`no-pets-header-${!appContext.userViewedByAdmin}`}>
            Start{" "}
            <Link to="/search" className="link-to-search">
              searching
            </Link>{" "}
            now!
          </div>
        </>
      )}
    </>
  );
}

export default PetsGroups;
