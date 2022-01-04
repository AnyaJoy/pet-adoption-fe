import { useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import SearchForm from "../Search/SearchForm";
import { getAllPets } from "../RequestsDB";

function HomeUserLoggedIn() {
  const appContext = useContext(AppContext);

  useEffect(() => {
    getAllPets(appContext.setPetsToDisplay);
  }, [])

  return (
    <div className="home-page-logged-in-wrapper">
      <div className="welcome-header-logged-in">
        Welcome, {appContext.user.first_name} {appContext.user.last_name}!
      </div>
      <div className="service-description-logged-in">
        There are hundreds of pets waiting for a family right now. Let's find
        yours!
      </div>
      <div className="search-form-wrapper">
        <SearchForm />
      </div>
    </div>
  );
}

export default HomeUserLoggedIn;
