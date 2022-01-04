import "../Styles/Profile.css";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import UserProfile from "../Components/Profile/UserProfile";
import UserPets from "../Components/Profile/UserPets";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getUserById } from "../Components/RequestsDB";
import Loader from "../Components/Loader";

export default function Profile() {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const [user, setUser] = useState();
  const token = JSON.parse(localStorage.getItem("token"));
  const [pageLoading, setPageLoading] = useState(true);
  const headersConfig = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    //getting user id from url
    var userId = location.pathname.replace("/user/", "");

    if (userId == "/profile") {
      //user is viewing his profile
      appContext.setLocation("/profile");
      appContext.setUserViewedByAdmin(false);
      setUser(appContext.user);
    } else {
      //admin is viewing user's profile
      getUserById(userId, headersConfig, appContext.setUserViewedByAdmin);
    }

    setTimeout(() => {
      setPageLoading(false);
    }, 600);
  }, []);

  return (
    <>
      {pageLoading ? (
        <Loader classname="loader" />
      ) : (
        <div className="profile-page-wrapper">
          {appContext.userViewedByAdmin ? (
            <>
              <UserProfile user={appContext.userViewedByAdmin} userType="Admin"/>
              <UserPets
                header="User's Pets"
                user={appContext.userViewedByAdmin}
                userType="Admin"
              />
            </>
          ) : (
            <>
              <UserProfile user={appContext.user} userType="User" />
              <UserPets header="My Pets" user={appContext.user} userType="User"
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
