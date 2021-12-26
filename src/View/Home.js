import "../Styles/Home.css";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import HomeUserLoggedIn from "../Components/Home/HomeUserLoggedIn";
import HomeUserLoggedOut from "../Components/Home/HomeUserLoggedOut"

function Home() {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.setLocation("/");
  }, []);

  return (
    <div className="home-page-wrapper">
      {appContext.user ? <HomeUserLoggedIn /> : <HomeUserLoggedOut />}
    </div>
  );
}

export default Home;
