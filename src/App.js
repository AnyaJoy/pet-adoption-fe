import "./Styles/App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./View/Home";
import Navbar from "./View/Navbar";
import AppContext from "./Context/AppContext";
import Profile from "./View/Profile";
import { changeActivePageColor } from "./Components/DetectPage";
import Search from "./View/Search";
import PetCard from "./View/PetCard";
import Admin from "./View/Admin";
import EditPetCard from "./View/EditPetCard";
import { getAllPets, getUserByToken } from "./Components/RequestsDB";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDr3Rtua5T_XkoW0J-bSQpWJYoEAvtbsCc",
  authDomain: "ipet-adoption-service.firebaseapp.com",
  projectId: "ipet-adoption-service",
  storageBucket: "ipet-adoption-service.appspot.com",
  messagingSenderId: "793108659672",
  appId: "1:793108659672:web:ebca54c5e7ffc2988646ad",
};
const app = initializeApp(firebaseConfig);

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(false);
  const [location, setLocation] = useState("");
  const [userViewedByAdmin, setUserViewedByAdmin] = useState(false);
  const [homePageIsActive, setHomePageActive] = useState(false);
  const [propfilePageIsActive, setProfilePageActive] = useState(false);
  const [adminPageIsActive, setAdminPageActive] = useState(false);
  const [searchPageIsActive, setSearchPageActive] = useState(false);
  const [allPets, setAllPets] = useState([]);
  const [petsToDisplay, setPetsToDisplay] = useState([]);
  const [error, setError] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const headersConfig = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    getAllPets(setAllPets);
    getAllPets(setPetsToDisplay);
    getUserByToken(headersConfig, setUser);
  }, []);

  useEffect(() => {
    changeActivePageColor(
      location,
      setHomePageActive,
      setProfilePageActive,
      setAdminPageActive,
      setSearchPageActive
    );
  }, [location]);

  return (
    <AppContext.Provider
      value={{
        user: user,
        setUser: setUser,
        location: location,
        setLocation: setLocation,
        homePageIsActive: homePageIsActive,
        propfilePageIsActive: propfilePageIsActive,
        adminPageIsActive: adminPageIsActive,
        searchPageIsActive: searchPageIsActive,
        allPets: allPets,
        setAllPets: setAllPets,
        allUsers: allUsers,
        setAllUsers: setAllUsers,
        headersConfig: headersConfig,
        userViewedByAdmin: userViewedByAdmin,
        setUserViewedByAdmin: setUserViewedByAdmin,
        error: error,
        setError: setError,
        petsToDisplay: petsToDisplay,
        setPetsToDisplay: setPetsToDisplay,
        successAlert: successAlert,
        setSuccessAlert: setSuccessAlert,
      }}
    >
      <div className="App">
        <Router>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/pet/:id" component={PetCard} />
          {user && (
            <>
              <Route exact path="/profile" component={Profile} />
              {user.type == "Admin" && (
                <>
                  <Route exact path="/dashboard" component={Admin} />
                  <Route exact path="/editpet/:id" component={EditPetCard} />
                  <Route exact path="/user/:id" component={Profile} />
                </>
              )}
            </>
          )}
        </Router>
      </div>
    </AppContext.Provider>
  );
}
export default App;
