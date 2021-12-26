import "../../Styles/AddOrEditPet.css";
import { useContext, useState, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import logo from "../../Pictures/pink-paw.png";
import logoBlue from "../../Pictures/logo.png";
import { addPet } from "../RequestsDB";

function AddPet() {
  const appContext = useContext(AppContext);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("");
  const [picture, setPicture] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [bio, setBio] = useState("");
  const [dietery, setDietery] = useState("");
  const [picturePreviewURL, setPicturePreviewURL] = useState(logoBlue);
  const token = JSON.parse(localStorage.getItem("token"));
  const headersConfig = {
    Authorization: `Bearer ${token}`,
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("picture", picture);
    form.append("name", name);
    form.append("type", type);
    form.append("bio", bio);
    form.append("adoption_status", status);
    form.append("height", height);
    form.append("weight", weight);
    form.append("color", color);
    form.append("hypoallergenic", hypoallergenic);
    form.append("dietery", dietery);
    form.append("breed", breed);

    addPet(form, appContext.setAllPets, headersConfig);

    setName("");
    setType("");
    setBreed("");
    setStatus("");
    setPicture("");
    setHeight("");
    setWeight("");
    setHypoallergenic("");
    setBio("");
    setDietery("");
    setColor("");
    setPicturePreviewURL(logoBlue);
  };

  const handlePictureUpload = (event) => {
    setPicturePreviewURL(URL.createObjectURL(event.target.files[0]));
    setPicture(event.target.files[0]);
  };

  return (
    <form onSubmit={onSubmit} className="add-pet-wrapper">
      <div className="add-pet-left-column">
        <div className="details-header">Details: </div>
        <div className="div-line"></div>
        <div className="add-pet-field">
          <img className="bullet-point-img" src={logo} />
          <input
            required
            className="add-pet-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="add-pet-field">
          <img className="bullet-point-img" src={logo} />
          <input
            required
            className="add-pet-input"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          ></input>
        </div>
        <div className="add-pet-field">
          <img className="bullet-point-img" src={logo} />
          <input
            required
            className="add-pet-input"
            placeholder="Type (ex. Cat/Dog)"
            value={type}
            onChange={(e) => setType(e.target.value)}
          ></input>
        </div>
        <div className="add-pet-field">
          <img className="bullet-point-img" src={logo} />
          <input
            required
            className="add-pet-input"
            placeholder="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          ></input>
        </div>
        <div className="add-pet-field">
          <img className="bullet-point-img" src={logo} />
          <input
            required
            className="add-pet-input"
            placeholder="Satus (ex. 'Available/Adopted/Fostered')"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          ></input>
        </div>
        <div className="add-pet-field">
          <img className="bullet-point-img" src={logo} />
          <input
            required
            className="add-pet-input"
            placeholder="Height in cm (ex. 30)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          ></input>
        </div>
        <div className="add-pet-field">
          <img className="bullet-point-img" src={logo} />
          <input
            required
            className="add-pet-input"
            placeholder="Weight in kg (ex. 5)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          ></input>
        </div>
        <div className="add-pet-field">
          <img className="bullet-point-img" src={logo} />
          <input
            required
            className="add-pet-input"
            placeholder="Hypoallergenic (ex. Yes)"
            value={hypoallergenic}
            onChange={(e) => setHypoallergenic(e.target.value)}
          ></input>
        </div>
        <div className="add-pet-field">
          <img className="bullet-point-img" src={logo} />
          <input
            required
            className="add-pet-input"
            placeholder="Dietery restrictions (ex. Fish)"
            value={dietery}
            onChange={(e) => setDietery(e.target.value)}
          ></input>
        </div>
        <input
          type="file"
          onChange={handlePictureUpload}
          id="file-input"
          name="avatar"
          required
        />

        <label className="upload-pic-button" for="file-input">
          Upload Picture
        </label>
      </div>

      <div className="add-pet-right-column">
        <button type="submit" className="add-pet-button">
          Add Pet
        </button>
        <div className="add-pet-field">
          <textarea
            required
            className="add-pet-textarea"
            placeholder="Bio (ex. The lovliest cat with a beautiful personality!)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <img src={picturePreviewURL} className="add-pet-img" />
      </div>
    </form>
  );
}

export default AddPet;
