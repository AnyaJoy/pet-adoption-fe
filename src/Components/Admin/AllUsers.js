import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import { getAllUsers } from "../RequestsDB";

function AllUsers() {
  const appContext = useContext(AppContext);
  const token = JSON.parse(localStorage.getItem("token"));
  const headersConfig = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    getAllUsers(appContext.setAllUsers, headersConfig);
  }, []);

  return (
    <>
      <div>
        <div className="user-types-header">Admins</div>
        {appContext.allUsers.map((user, index) => {
          if (user.type == "Admin") {
            return (
              <div key={user.id}>
                <Link to={`/user/${user.id}`} className="list-names">
                  {user.first_name} {user.last_name}
                </Link>
              </div>
            );
          }
        })}
      </div>
      <div>
        <div className="user-types-header">Users</div>
        {appContext.allUsers.map((user, index) => {
          if (user.type == "User") {
            return (
              <div key={user.id}>
                <Link to={`/user/${user.id}`} className="list-names">
                  {user.first_name} {user.last_name}
                </Link>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default AllUsers;
