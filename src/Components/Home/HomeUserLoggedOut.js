import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Pictures/logo.png";

function HomeUserLoggedOut() {
  return (
    <div className="home-page-logged-out-wrapper">
      <div className="left-column">
        <img className="logo" src={logo} />
        <div className="quote">
          “Until one has loved an animal, a part of one’s soul remains
          unawakened”
        </div>
        <div className="author">– Anatole France</div>
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
    </div>
  );
}

export default HomeUserLoggedOut;
