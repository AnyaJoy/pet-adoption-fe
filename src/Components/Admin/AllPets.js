import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";

function AllPets() {
  const appContext = useContext(AppContext);

  return appContext.allPets.map((pet, index) => {
    return (
      <div key={pet.id}>
        <Link to={`/editpet/${pet.id}`} className="list-names">
          {pet.name}
        </Link>
      </div>
    );
  });
}

export default AllPets;
