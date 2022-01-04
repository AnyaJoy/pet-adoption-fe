import React from "react";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import AddPet from "../Components/Admin/AddPet";
import AllPets from "../Components/Admin/AllPets";
import AllUsers from "../Components/Admin/AllUsers";
import Loader from "../Components/Loader";
import { getAllPets } from "../Components/RequestsDB";

function Admin() {
  const appContext = useContext(AppContext);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    appContext.setLocation("/dashboard");
    setTimeout(() => {
      setPageLoading(false);
    }, 600);
    getAllPets(appContext.setAllPets);
  }, []);

  return (
    <div className="dashboard-wrapper">
      {pageLoading ? (
        <Loader classname="loader" />
      ) : (
        <>
          <div className="users-list">
            <div className="all-header">All Users</div>
            <AllUsers />
          </div>
          <div className="add-pet-form-wrapper">
            <div className="add-pet-header">Admin's dashboard</div>
            <AddPet />
          </div>
          <div className="pets-list">
            <div className="all-header">All Pets</div>
            <AllPets />
          </div>
        </>
      )}
    </div>
  );
}

export default Admin;
