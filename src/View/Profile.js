import "../Styles/Profile.css";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import UserProfile from "../Components/Profile/UserProfile";
import UserPets from "../Components/Profile/UserPets";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {getUserById} from "../Components/RequestsDB"

export default function Profile() {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const [userViewedByAdmin, setUserViewedByAdmin] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const headersConfig = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    var userId = location.pathname.replace("/user/", "");
    if (userId == "/profile") {
      //user is viewing his profile
      appContext.setLocation("/profile");
    } else {
      //admin is viewing user's profile
      getUserById(userId, headersConfig, setUserViewedByAdmin);
    }
  }, []);

  return (
    <div className="profile-page-wrapper">
      {userViewedByAdmin ? (
        <>
          <UserProfile user={userViewedByAdmin} userType="Admin" />
          <UserPets
            header="User's Pets"
            userViewedByAdmin={userViewedByAdmin}
          />
        </>
      ) : (
        <>
          <UserProfile user={appContext.user} userType="User" />
          <UserPets header="My Pets" />
        </>
      )}
    </div>
  );
}
