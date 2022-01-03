import "../../Styles/Profile.css";
import { useState, useContext, useEffect } from "react";
import Loader from "../Loader";
import AppContext from "../../Context/AppContext";
import { editUser } from "../RequestsDB";

function ProfileUpdateForm({ bio }) {
  const appContext = useContext(AppContext);

  const [firstName, setFirstName] = useState(appContext.user.first_name);
  const [lastName, setLastName] = useState(appContext.user.last_name);
  const [email, setEmail] = useState(appContext.user.email);
  const [password, setPassword] = useState(appContext.user.password_hash);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const headersConfig = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    appContext.setError(false); // in case there was an error alert perviously

    if (newPassword) {
      setPassword(newPassword);
    } else {
      setPassword(appContext.user.password_hash);
    }

    if (
      firstName != appContext.user.first_name ||
      lastName != appContext.user.last_name ||
      email != appContext.user.email ||
      newPassword != "" ||
      bio != appContext.user.bio
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [newPassword, email, firstName, lastName, bio]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    appContext.setError(false);
    setLoading(true);

    //for UX
    setTimeout(() => {
      const updatedUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        bio: bio,
      };

      editUser(
        appContext.user.id,
        updatedUser,
        appContext.setUser,
        headersConfig
      )
        .then(() => {
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

  return (
    <form className="update-form-wrapper" onSubmit={handleUpdateProfile}>
      <div className="input-descriptions">
        <span>Fisrt name</span>
        <span>Last name</span>
      </div>
      <div className="row-inputs-wrapper">
        <input
          required
          className="double-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <input
          required
          className="double-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
      </div>

      <div className="input-update">E-mail</div>
      <input
        required
        className="single-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>

      <div className="input-update">New password</div>

      <input
        minLength={6}
        className="single-input"
        type="password"
        placeholder="********"
        onChange={(e) => setNewPassword(e.target.value)}
        value={newPassword}
      ></input>

      {loading ? (
        <Loader classname={"loader-profile"} />
      ) : (
        <>
          {appContext.successAlert ? (
            <button className="save-button-success">Saved!</button>
          ) : (
            <button type="submit" className={`save-button-${!buttonDisabled}`} disabled={buttonDisabled}>
              Save Changes
            </button>
          )}
        </>
      )}
    </form>
  );
}

export default ProfileUpdateForm;
