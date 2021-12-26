import React from "react";
import { Link } from "react-router-dom";
import LogoAndQuote from "./LogoAndQuote";

function HomeUserLoggedOut() {
  return (
    <>
      <div className="left-column">
        <LogoAndQuote />
      </div>
      <div className="right-column">
        <div className="welcome-header">Welcome to iPet!</div>
        <div className="service-description">
          It is a <span className="bold">pet adoption</span> service that
          connects future owners and breeders to make the perfect match.
        </div>
        <br></br>
        <div className="service-description">
          Please register to get free access to the platform.
        </div>
        <br></br>
        <div className="service-description">
          And start your{" "}
          <Link to="/search" className="search-pointer">
            search
          </Link>{" "}
          now!
        </div>
      </div>
    </>
  );
}

export default HomeUserLoggedOut;
