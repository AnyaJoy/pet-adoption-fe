import "../../Styles/Profile.css";
import { useState, useContext, useEffect } from "react";
import Loader from "../Loader";
import AppContext from "../../Context/AppContext";
import { editUser } from "../RequestsDB";

function ProfileUpdateForm({ bio, setBio }) {
  const appContext = useContext(AppContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const headersConfig = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    setFirstName(appContext.user.first_name);
    setLastName(appContext.user.last_name);
    setEmail(appContext.user.email);
    setBio(appContext.user.bio);
    setPassword(appContext.user.password_hash);
  }, [appContext.user]);

  useEffect(() => {
    if (newPassword) {
      setPassword(newPassword);
    } else {
      setPassword(appContext.user.password_hash);
    }
  }, [newPassword]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
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
      );

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
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
        className="single-input"
        type="password"
        placeholder="********"
        onChange={(e) => setNewPassword(e.target.value)}
        value={newPassword}
      ></input>

      {loading ? (
        <Loader classname={"loader"} />
      ) : (
        <button type="submit" className={`save-button-${true}`}>
          Save Changes
        </button>
      )}
    </form>
  );
}

export default ProfileUpdateForm;
