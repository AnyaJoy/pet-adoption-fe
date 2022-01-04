import "../Styles/PetPage.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import logo from "../Pictures/pink-paw.png";
import {getPet, savePet, fosterPet, returnFosteredPet, adoptPet, unsavePet, returnAdoptedPet, checkPetStatus} from "../Components/RequestsDB";

function PetCard() {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const [pet, setPet] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const [petFostered, setPetFostered] = useState("Foster");
  const [petAdopted, setPetAdopted] = useState("Adopt");
  const [petSaved, setPetSaved] = useState("Save ❤");
  const [petOwned, setPetOwned] = useState(false);

  useEffect(() => {
    appContext.setLocation("/pet");
    var petId = location.pathname.replace("/pet/", "");
    getPet(petId)
      .then((res) => {
        setPet(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    checkPetStatus(
      appContext.user.id,
      petId,
      appContext.headersConfig,
      setPetSaved,
      setPetFostered,
      setPetAdopted
    ).catch((err) => {
      console.log(err);
    });
  }, [appContext.user]);

  useEffect(() => {
    if (pet.adoption_status == "Adopted" && petAdopted == "Adopt") {
      return setPetOwned(true);
    } else {
      setPetOwned(false);
    }

    if (pet.adoption_status == "Fostered" && petFostered !== "Return") {
      return setPetOwned(true);
    } else {
      setPetOwned(false);
    }
  }, [pet, petAdopted, petFostered]);

  const handleSave = async (e) => {
    e.preventDefault();
    showAlertIfNotLoggedIn();
    if (petSaved == "Save ❤") {
      savePet(appContext.user.id, pet.id, appContext.headersConfig, setPetSaved)
        .then(() => {
          setPetSaved("Unsave ❤");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      unsavePet(appContext.user.id, pet.id, appContext.headersConfig)
        .then(() => {
          setPetSaved("Save ❤");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleAdopt = async (e) => {
    e.preventDefault();
    showAlertIfNotLoggedIn();
    if (petAdopted == "Adopt") {
      if (petFostered == "Return") {
        returnFosteredPet(appContext.user.id, pet.id, appContext.headersConfig)
          .then(() => {
            setPetFostered("Foster");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      adoptPet(appContext.user.id, pet.id, appContext.headersConfig, setPet)
        .then(() => {
          setPetAdopted("Return");
          getPet(pet.id).then((pet) => {
            setPet(pet.data[0]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      returnAdoptedPet(
        appContext.user.id,
        pet.id,
        appContext.headersConfig,
        setPetAdopted,
        setPet
      )
        .then(() => {
          setPetAdopted("Adopt");
          getPet(pet.id).then((pet) => {
            setPet(pet.data[0]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFoster = async (e) => {
    e.preventDefault();
    showAlertIfNotLoggedIn();
    if (petFostered == "Foster") {
      fosterPet(appContext.user.id, pet.id, appContext.headersConfig)
        .then(() => {
          setPetFostered("Return");
          getPet(pet.id).then((pet) => {
            setPet(pet.data[0]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      returnFosteredPet(appContext.user.id, pet.id, appContext.headersConfig)
        .then(() => {
          setPetFostered("Foster");
          getPet(pet.id).then((pet) => {
            setPet(pet.data[0]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function showAlertIfNotLoggedIn() {
    if (!appContext.user) {
      setLoginAlert(true);
      setTimeout(() => {
        setLoginAlert(false);
      }, [3000]);
    }
  }

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
            <span className="card-info">{pet.weight}kg</span>
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
          <div className={`show-buttons-${!petOwned}`}>
            <button
              disabled={petOwned}
              onClick={handleAdopt}
              className="pet-buttons"
            >
              {petAdopted}
            </button>
            {petAdopted != "Return" && (
              <button
                disabled={petOwned}
                onClick={handleFoster}
                className="pet-buttons"
              >
                {petFostered}
              </button>
            )}
          </div>
        </div>
        <div className="pet-page-right-column">
          <button onClick={handleSave} className="save-pet-button">
            {petSaved}
          </button>
          <span className="pet-bio">{pet.bio}</span>
          <img src={pet.picture} className="pet-img-big" />
        </div>
      </div>
    </div>
  );
}

export default PetCard;
