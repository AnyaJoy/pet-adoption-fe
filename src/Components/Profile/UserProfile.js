import React from "react";
import { useState, useContext } from "react";
import ProfileUpdateForm from "./ProfileUpdateForm";
import "../../Styles/AdminPages.css";
import AppContext from "../../Context/AppContext";

function UserProfile({ user, userType }) {
  const appContext = useContext(AppContext);
  const [bio, setBio] = useState(appContext.user.bio);
  const [picture, setPicture] = useState(appContext.user.picture);
  const [picturePreviewURL, setPicturePreviewURL] = useState(appContext.user.picture);

  const handlePictureUpload = (event) => {
    setPicturePreviewURL(URL.createObjectURL(event.target.files[0]));
    setPicture(event.target.files[0]);
  };

  //component is used by admin(viewing) and user(modyfying)
  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-card-body">
          <div className="error-alert-profile">{appContext.error}</div>

          <div className="profile-description">
            <img className="profile-img" src={picturePreviewURL}></img>
            {userType == "User" && (
              <>
                <input
                  type="file"
                  onChange={handlePictureUpload}
                  id="file-input-profile"
                  name="avatar"
                />
                <label className="upload-avatar-button" for="file-input-profile"></label>
              </>
            )}
            <div className="user-name-and-description">
              <span className="user-name">
                {user.first_name} {user.last_name}
              </span>
              {userType == "Admin" ? (
                <div className="bio-wrapper">{user.bio}</div>
              ) : (
                <textarea
                  className="bio-wrapper"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={40}
                ></textarea>
              )}
            </div>
          </div>

          {userType == "Admin" ? (
            <div className="user-info-wrapper">
              <div className="info-name-field">Fisrt name</div>
              <div className="info-field">{user.first_name}</div>
              <div className="info-name-field">Last name</div>
              <div className="info-field">{user.last_name}</div>
              <div className="info-name-field">E-mail</div>
              <div className="info-field">{user.email}</div>
              <div className="info-name-field">Type</div>
              <div className="info-field">{user.type}</div>
            </div>
          ) : (
            <ProfileUpdateForm bio={bio} picture={picture} />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
