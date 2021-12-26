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

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(false);
  const [location, setLocation] = useState();
  const [homePageIsActive, setHomePageActive] = useState(false);
  const [propfilePageIsActive, setProfilePageActive] = useState(false);
  const [adminPageIsActive, setAdminPageActive] = useState(false);
  const [allPets, setAllPets] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));
  const headersConfig = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    getUserByToken(headersConfig, setUser);
    getAllPets(setAllPets);
  }, []);

  useEffect(() => {
    changeActivePageColor(
      location,
      setHomePageActive,
      setProfilePageActive,
      setAdminPageActive
    );
  }, [location]);

  useEffect(() => {
   console.log(user)
  }, [user])

  return (
    <AppContext.Provider
      value={{
        user: user,
        setUser: setUser,
        location: location,
        setLocation: setLocation,
        homePageIsActive: homePageIsActive,
        propfilePageIsActive: propfilePageIsActive,
        setAdminPageActive: setAdminPageActive,
        adminPageIsActive: adminPageIsActive,
        allPets: allPets,
        setAllPets: setAllPets,
        allUsers: allUsers,
        setAllUsers: setAllUsers,
      }}
    >
      <div className="App">
        <Router>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/user/:id" component={Profile} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/pet/:id" component={PetCard} />
          <Route exact path="/editpet/:id" component={EditPetCard} />
          <Route exact path="/dashboard" component={Admin} />
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
