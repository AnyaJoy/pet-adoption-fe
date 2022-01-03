const changeActivePageColor = (location, setHomePageActive, setProfilePageActive, setAdminPageActive, setSearchPageActive) => {
  if (location === "/") {
    setHomePageActive(true);
    setProfilePageActive(false);
    setAdminPageActive(false)
    setSearchPageActive(false)
  }

  if (location === "/profile") {
    setHomePageActive(false);
    setProfilePageActive(true);
    setAdminPageActive(false)
    setSearchPageActive(false)
  }

  if (location === "/dashboard") {
    setHomePageActive(false);
    setProfilePageActive(false);
    setAdminPageActive(true)
    setSearchPageActive(false)
  }
  
  if (location === "/search" || location === "/pet") {
    setHomePageActive(false);
    setProfilePageActive(false);
    setAdminPageActive(false)
    setSearchPageActive(true)
  }
};

export { changeActivePageColor };
