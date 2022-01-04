import "../Styles/PetPage.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import logo from "../Pictures/pink-paw.png";
import {
  getPet,
  savePet,
  fosterPet,
  returnFosteredPet,
  adoptPet,
  unsavePet,
  returnAdoptedPet,
  checkPetStatus,
} from "../Components/RequestsDB";
import Loader from "../Components/Loader";

function PetCard() {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const [pet, setPet] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const [fosterButton, setFosterButton] = useState("Foster");
  const [adoptButton, setAdoptButton] = useState("Adopt");
  const [saveButton, setSaveButton] = useState("Save ❤");
  const [petOwned, setPetOwned] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    //getting pet id from the url
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
      setSaveButton,
      setFosterButton,
      setAdoptButton
    ).catch((err) => {
      console.log(err);
    });
  }, [appContext.user]);

  //checking pet status in relation to the user
  useEffect(() => {
    if (pet.adoption_status == "Adopted" && adoptButton == "Adopt") {
      return setPetOwned(true);
    } else {
      setPetOwned(false);
    }

    if (pet.adoption_status == "Fostered" && fosterButton !== "Return") {
      return setPetOwned(true);
    } else {
      setPetOwned(false);
    }
  }, [pet, adoptButton, fosterButton]);

  const handleSave = async (e) => {
    // save if not and vice versa
    e.preventDefault();
    showAlertIfNotLoggedIn();
    try {
      if (saveButton == "Save ❤") {
        savePet(
          appContext.user.id,
          pet.id,
          appContext.headersConfig,
          setSaveButton
        ).then(() => {
          setSaveButton("Unsave ❤");
        });
      } else {
        unsavePet(appContext.user.id, pet.id, appContext.headersConfig).then(
          () => {
            setSaveButton("Save ❤");
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdopt = async (e) => {    // adopt if not and vice versa
    e.preventDefault();
    showAlertIfNotLoggedIn();
    try {
      if (adoptButton == "Adopt") {
        if (fosterButton == "Return") {          // canceling fostering if exists
          returnFosteredPet(
            appContext.user.id,
            pet.id,
            appContext.headersConfig
          ).then(() => {
            setFosterButton("Foster");
          });
        }
        adoptPet(
          appContext.user.id,
          pet.id,
          appContext.headersConfig,
          setPet
        ).then(() => {
          setAdoptButton("Return");
          getPet(pet.id).then((pet) => {
            setPet(pet.data[0]);
          });
        });
      } else {
        returnAdoptedPet(
          appContext.user.id,
          pet.id,
          appContext.headersConfig,
          setAdoptButton,
          setPet
        ).then(() => {
          setAdoptButton("Adopt");
          getPet(pet.id).then((pet) => {
            setPet(pet.data[0]);
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFoster = async (e) => {    // foster if not and vice versa
    e.preventDefault();
    showAlertIfNotLoggedIn();
    try {
      if (fosterButton == "Foster") {
        fosterPet(appContext.user.id, pet.id, appContext.headersConfig).then(
          () => {
            setFosterButton("Return");
            getPet(pet.id).then((pet) => {
              setPet(pet.data[0]);
            });
          }
        );
      } else {
        returnFosteredPet(
          appContext.user.id,
          pet.id,
          appContext.headersConfig
        ).then(() => {
          setFosterButton("Foster");
          getPet(pet.id).then((pet) => {
            setPet(pet.data[0]);
          });
        });
      }
    } catch (err) {
      console.log(err);
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
      {pageLoading ? (
        <Loader classname="loader" />
      ) : (
        <>
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
                  {adoptButton}
                </button>
                {adoptButton != "Return" && (
                  <button
                    disabled={petOwned}
                    onClick={handleFoster}
                    className="pet-buttons"
                  >
                    {fosterButton}
                  </button>
                )}
              </div>
            </div>

            <div className="pet-page-right-column">
              <button onClick={handleSave} className="save-pet-button">
                {saveButton}
              </button>

              <span className="pet-bio">{pet.bio}</span>
              <img src={pet.picture} className="pet-img-big" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PetCard;
