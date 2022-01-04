import "../Styles/Home.css";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import HomeUserLoggedIn from "../Components/Home/HomeUserLoggedIn";
import HomeUserLoggedOut from "../Components/Home/HomeUserLoggedOut";
import Loader from "../Components/Loader";

function Home() {
  const appContext = useContext(AppContext);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    appContext.setLocation("/");

    setTimeout(() => {
      setPageLoading(false);
    }, 600);
  }, []);

  return (
    <>
      {pageLoading ? (
        <Loader classname="loader" />
      ) : (
        <div className="home-page-wrapper">
          {appContext.user ? <HomeUserLoggedIn /> : <HomeUserLoggedOut />}
        </div>
      )}
    </>
  );
}

export default Home;
