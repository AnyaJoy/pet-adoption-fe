import "../Styles/PetPage.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import logo from "../Pictures/pink-paw.png";
import { getPet, editPet } from "../Components/RequestsDB";
import Loader from "../Components/Loader";

function EditPetCard() {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const [pet, setPet] = useState("");
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [breed, setBreed] = useState();
  const [status, setStatus] = useState();
  const [picture, setPicture] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [color, setColor] = useState();
  const [hypoallergenic, setHypoallergenic] = useState();
  const [bio, setBio] = useState();
  const [dietery, setDietery] = useState();
  const [picturePreviewURL, setPicturePreviewURL] = useState();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    var petId = location.pathname.replace("/editpet/", "");
    getPet(petId)
      .then((res) => {
        setPet(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setName(pet.name);
    setType(pet.type);
    setBreed(pet.breed);
    setStatus(pet.adoption_status);
    setHeight(pet.height);
    setWeight(pet.weight);
    setColor(pet.color);
    setHypoallergenic(pet.hypoallergenic);
    setBio(pet.bio);
    setDietery(pet.dietery);
    setPicture(pet.picture);
    setPicturePreviewURL(pet.picture);
  }, [pet]);

  const handleEditPet = async (e) => {
    e.preventDefault();
    appContext.setError(false);
    setLoading(true);

    //for UX
    setTimeout(() => {
      const form = new FormData();
      form.append("picture", picture);
      form.append("name", name);
      form.append("type", type);
      form.append("bio", bio);
      form.append("adoption_status", status); //can't be changed manually
      form.append("height", height);
      form.append("weight", weight);
      form.append("color", color);
      form.append("hypoallergenic", hypoallergenic);
      form.append("dietery", dietery);
      form.append("breed", breed);

      editPet(pet.id, form, appContext.headersConfig)
        .then(() => {
          getPet(pet.id).then((pet) => setPet(pet.data[0]));
          setButtonDisabled(true);
          setLoading(false);
          appContext.setSuccessAlert(true);
          setTimeout(() => {
            appContext.setSuccessAlert(false);
          }, 2000);
        })
        .catch((err) => {
          setLoading(false);
          appContext.setError(err.response.data);
          return;
        });
    }, 600);
  };

  const handlePictureUpload = (event) => {
    setPicturePreviewURL(URL.createObjectURL(event.target.files[0]));
    setPicture(event.target.files[0]);
  };

  useEffect(() => {
    if (
      name != pet.name ||
      type != pet.type ||
      breed != pet.breed ||
      picture != pet.picture ||
      height != pet.height ||
      weight != pet.weight ||
      color != pet.color ||
      hypoallergenic != pet.hypoallergenic ||
      bio != pet.bio ||
      dietery != pet.dietery
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [name, type, breed, picture, height, weight, color, hypoallergenic, bio, dietery,]);

  return (
    <div className="pet-page-wrapper">
      <div className="edit-pet-page-header">{`${name}'s Pet Card`}</div>
      <form onSubmit={handleEditPet} className="edit-pet-page-wrapper">
        <div className="add-pet-wrapper">
          <div className="error-alert-add-edit-pet">{appContext.error}</div>
          <div className="add-pet-left-column">
            <div className="details-header">Details: </div>
            <div className="div-line"></div>
            <div className="add-pet-field">
              <img className="bullet-point-img" src={logo} />
              <span className="pet-info-field-name">Name: </span>
              <input
                required
                className="add-pet-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="add-pet-field">
              <img className="bullet-point-img" src={logo} />
              <span className="pet-info-field-name">Color: </span>
              <input
                required
                className="add-pet-input"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></input>
            </div>
            <div className="add-pet-field">
              <img className="bullet-point-img" src={logo} />
              <span className="pet-info-field-name">Type: </span>
              <input
                required
                className="add-pet-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              ></input>
            </div>
            <div className="add-pet-field">
              <img className="bullet-point-img" src={logo} />
              <span className="pet-info-field-name">Breed: </span>
              <input
                required
                className="add-pet-input"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              ></input>
            </div>
            <div className="add-pet-field">
              <img className="bullet-point-img" src={logo} />
              <span className="pet-info-field-name">Height(cm): </span>
              <input
                type="number"
                required
                className="add-pet-input"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              ></input>
            </div>
            <div className="add-pet-field">
              <img className="bullet-point-img" src={logo} />
              <span className="pet-info-field-name">Weight(kg): </span>
              <input
                type="number"
                required
                className="add-pet-input"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              ></input>
            </div>
            <div className="add-pet-field">
              <img className="bullet-point-img" src={logo} />
              <span className="pet-info-field-name">Hypoallergenic: </span>
              <input
                required
                className="add-pet-input"
                value={hypoallergenic}
                onChange={(e) => setHypoallergenic(e.target.value)}
              ></input>
            </div>
            <div className="add-pet-field">
              <img className="bullet-point-img" src={logo} />
              <span className="pet-info-field-name">Dietery</span>
              <input
                required
                className="add-pet-input"
                value={dietery}
                onChange={(e) => setDietery(e.target.value)}
              ></input>
            </div>

            {loading ? (
              <Loader classname={"loader-edit-pet"} />
            ) : (
              <>
                {appContext.successAlert ? (
                  <button className="add-pet-button-success">Saved!</button>
                ) : (
                  <button
                    type="submit"
                    className={`add-pet-button-${!buttonDisabled}`}
                    disabled={buttonDisabled}
                  >
                    Save Changes
                  </button>
                )}
              </>
            )}
          </div>
          <div className="add-pet-right-column">
            <input
              type="file"
              onChange={handlePictureUpload}
              id="file-input-edit"
              name="avatar"
            />
            <label className="upload-pic-button" for="file-input-edit">
              Update Picture
            </label>

            <div className="add-pet-field">
              <textarea
                required
                className="add-pet-textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={50}
              ></textarea>
            </div>
            <img src={picturePreviewURL} className="edit-pet-img" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPetCard;
