const changeActivePageColor = (location, setHomePageActive, setProfilePageActive, setAdminPageActive) => {
  if (location === "/") {
    setHomePageActive(true);
    setProfilePageActive(false);
    setAdminPageActive(false)
  }

  if (location === "/profile") {
    setHomePageActive(false);
    setProfilePageActive(true);
    setAdminPageActive(false)
  }

  if (location === "/dashboard") {
    setHomePageActive(false);
    setProfilePageActive(false);
    setAdminPageActive(true)
  }
  
  if (location === "/search" || location === "/pet") {
    setHomePageActive(false);
    setProfilePageActive(false);
    setAdminPageActive(false)
  }
};

export { changeActivePageColor };
