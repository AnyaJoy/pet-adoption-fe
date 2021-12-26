import React from "react";
import { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import AddPet from "../Components/Admin/AddPet";
import AllPets from "../Components/Admin/AllPets";
import AllUsers from "../Components/Admin/AllUsers";

function Admin() {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.setLocation("/dashboard");
  }, []);

  return (
    <div className="dashboard-wrapper">
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
    </div>
  );
}

export default Admin;
