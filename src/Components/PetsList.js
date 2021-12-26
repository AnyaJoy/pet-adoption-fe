import "../Styles/PetsList.css";
import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import logo from "../Pictures/pink-paw.png";
import { Link } from "react-router-dom";

function PetsList({ petsArray, cardType }) {
  const appContext = useContext(AppContext);

  const openPetCard = () => {};

  return petsArray.map((pet, index) => {
    return (
      <span key={pet.id} className={`pet-card-wrapper-${cardType}`}>
        <img className="pet-img" src={pet.picture}></img>
        <div className={`pet-info-${cardType}`}>
          <div className="pet-name">{pet.name}</div>
          <div className={`pet-nullet-points-${cardType}`}>
            <div className="div-line"></div>
            <div className="card-field-label">
              <img className="bullet-point-img" src={logo} /> &nbsp;Type:{" "}
              <span className="card-info">{pet.type}</span>
            </div>
            <div className="card-field-label">
              <img className="bullet-point-img" src={logo} /> &nbsp;Status:{" "}
              <span className="card-info">{pet.adoption_status}</span>
            </div>
            <div className="card-field-label">
              <img className="bullet-point-img" src={logo} /> &nbsp;Height:{" "}
              <span className="card-info">{pet.height}сm</span>
            </div>
            <div className="card-field-label">
              <img className="bullet-point-img" src={logo} /> &nbsp;Weight:{" "}
              <span className="card-info">{pet.weight}lb</span>
            </div>
          </div>
          <Link
            to={`/pet/${pet.id}`}
            className={`open-card-button-${cardType}`}
          >
            Open card
          </Link>
        </div>
      </span>
    );
  });
}

export default PetsList;
