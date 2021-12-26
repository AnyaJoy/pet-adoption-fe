import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Pictures/logo.png";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import PetsList from "../PetsList";

function PetsGroups({
  petsGroup,
  messageForAdmin,
  messageForUser,
  userViewedByAdmin,
}) {
  const appContext = useContext(AppContext);

  return (
    <>
      {userViewedByAdmin ? (
        //admin is viewing user's pets
        <>
          {userViewedByAdmin[`${petsGroup}`] ? (
            <div className="saved-pets-wrapper">
              <PetsList petsArray={appContext.allPets} cardType="horizontal" />
            </div>
          ) : (
            <div className="saved-pets-empty">
              <img src={logo} className="logo-profile-page" />
              <div className="no-pets-header">{messageForAdmin}</div>
            </div>
          )}
        </>
      ) : (
        //user is viewing his pets
        <>
          {appContext.user[`${petsGroup}`] ? (
            <div className="saved-pets-wrapper">
              <PetsList petsArray={appContext.allPets} cardType="horizontal" />
            </div>
          ) : (
            <div className="saved-pets-empty">
              <img src={logo} className="logo-profile-page" />
              <div className="no-pets-header">{messageForUser}</div>
              <div className="no-pets-header">
                Start{" "}
                <Link to="/search" className="link-to-search">
                  searching
                </Link>{" "}
                now!
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default PetsGroups;
