import "../Styles/PetPage.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import logo from "../Pictures/pink-paw.png";
import { getPet, savePet, fosterPet, adoptPet } from "../Components/RequestsDB";

function PetCard() {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const [pet, setPet] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const headersConfig = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    appContext.setLocation("/pet");
    var petId = location.pathname.replace("/pet/", "");
    getPet(petId, setPet);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!appContext.user) {
      showAlert();
    }
    try {
      savePet(appContext.user.id, pet.id, headersConfig)
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdopt = async (e) => {
    e.preventDefault();
    if (!appContext.user) {
      showAlert();
    }
    try {
      adoptPet(appContext.user.id, pet.id, headersConfig)
    } catch (err) {
      console.log(err);
    }
  };

  const handleFoster = async (e) => {
    e.preventDefault();
    if (!appContext.user) {
      showAlert();
    }
    try {
      fosterPet(appContext.user.id, pet.id, headersConfig)
    } catch (err) {
      console.log(err);
    }
  };

  function showAlert() {
    setLoginAlert(true);
    setTimeout(() => {
      setLoginAlert(false);
    }, [2000]);
  };

  return (
    <div className="pet-page-wrapper">
      <div className={`login-alert-${loginAlert}`}>
        Log in to enable this option :)
      </div>

      <div className="pet-page-header">{`${pet.name}'s Pet Card`}</div>
      <div className="pet-wrapper">
        <div className="pet-page-left-column">
          <div className="details-header">Details:</div>
          <div className="div-line"></div>
          <div className="card-field-label">
            <img className="bullet-point-img" src={logo} /> &nbsp;Type:{" "}
            <span className="card-info">{pet.type}</span>
          </div>
          <div className="card-field-label">
            <img className="bullet-point-img" src={logo} /> &nbsp;Breed:{" "}
            <span className="card-info">{pet.breed}</span>
          </div>
          <div className="card-field-label">
            <img className="bullet-point-img" src={logo} /> &nbsp;Status:{" "}
            <span className="card-info">{pet.adoption_status}</span>
          </div>
          <div className="card-field-label">
            <img className="bullet-point-img" src={logo} /> &nbsp;Color:{" "}
            <span className="card-info">{pet.color}</span>
          </div>
          <div className="card-field-label">
            <img className="bullet-point-img" src={logo} /> &nbsp;Height:{" "}
            <span className="card-info">{pet.height}cm</span>
          </div>
          <div className="card-field-label">
            <img className="bullet-point-img" src={logo} /> &nbsp;Weight:{" "}
            <span className="card-info">{pet.weight}lb</span>
          </div>
          <div className="card-field-label">
            <img className="bullet-point-img" src={logo} />{" "}
            &nbsp;Hypoallergenic:{" "}
            <span className="card-info">{pet.hypoallergenic}</span>
          </div>
          <div className="card-field-label">
            <img className="bullet-point-img" src={logo} /> &nbsp;Dietery
            restrictions: <span className="card-info">{pet.dietery}</span>
          </div>
          <div className="buttons">
            <button onClick={handleAdopt} className="pet-buttons">
              Adopt
            </button>
            <button onClick={handleFoster} className="pet-buttons">
              Foster
            </button>
          </div>
        </div>
        <div className="pet-page-right-column">
          <button onClick={handleSave} className="save-pet-button">
            Save ❤
          </button>
          <span className="pet-bio">{pet.bio}</span>
          <img src={pet.picture} className="pet-img-big" />
        </div>
      </div>
    </div>
  );
}

export default PetCard;
