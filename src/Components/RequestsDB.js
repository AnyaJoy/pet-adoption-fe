import axios from "axios";
const URLrequests = process.env.REACT_APP_URL_REQUESTS;

const signupUser = async (newUser) => {
  await axios.post(`${URLrequests}/users/signup`, newUser);
};

const loginUser = async (user) => {
  return await axios.post(`${URLrequests}/users/login`, user);
};

const getAllUsers = async (setAllUsers, headersConfig) => {
  await axios
    .get(`${URLrequests}/users/`, {
      headers: headersConfig,
    })
    .then((res) => {
      setAllUsers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUserById = async (userId, headersConfig, setUser) => {
  await axios
    .get(`${URLrequests}/users/${userId}`, {
      headers: headersConfig,
    })
    .then((res) => {
      setUser(res.data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUserByToken = async (headersConfig, setUser) => {
  await axios
    .get(`${URLrequests}/users/currentuser`, {
      headers: headersConfig,
    })
    .then((res) => {
      setUser(res.data[0]);
    })
    .catch((err) => {
      console.log(err);
      setUser(false);
      return;
    });
};

const editUser = async (userId, newObject, setUser, headersConfig) => {
  await axios
    .put(`${URLrequests}/users/${userId}`, newObject, {
      headers: headersConfig,
    })
    .then(() => {
      getUserByToken(headersConfig, setUser);
    });
};

const getAllPets = async (setAllPets) => {
  await axios
    .get(`${URLrequests}/pets`)
    .then((res) => {
      setAllPets(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const searchPets = async (searchParameters, setPets) => {
  return await axios
    .post(`${URLrequests}/pets/search`, searchParameters)
    .then((res) => {
      setPets(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPet = async (petId) => {
  return await axios.get(`${URLrequests}/pets/${petId}`);
};

const editPet = async (petId, newObject, headersConfig) => {
  await axios.put(`${URLrequests}/pets/${petId}`, newObject, {
    headers: headersConfig,
  });
};

const addPet = async (newPet, setAllPets, headersConfig) => {
  await axios
    .post(`${URLrequests}/pets/`, newPet, {
      headers: headersConfig,
    })
    .then(() => {
      getAllPets(setAllPets);
    });
};

const savePet = async (userId, petId, headersConfig) => {
  await axios.post(
    `${URLrequests}/pets/save/${userId}/${petId}`,
    {},
    { headers: headersConfig }
  );
};

const unsavePet = async (userId, petId, headersConfig) => {
  await axios.delete(`${URLrequests}/pets/save/${userId}/${petId}`, {
    headers: headersConfig,
  });
};

const adoptPet = async (userId, petId, headersConfig) => {
  await axios.post(
    `${URLrequests}/pets/adopt/${userId}/${petId}`,
    {},
    { headers: headersConfig }
  );
};

const returnAdoptedPet = async (userId, petId, headersConfig) => {
  await axios.delete(`${URLrequests}/pets/adopt/${userId}/${petId}`, {
    headers: headersConfig,
  });
};

const fosterPet = async (userId, petId, headersConfig) => {
  await axios.post(
    `${URLrequests}/pets/foster/${userId}/${petId}`,
    {},
    { headers: headersConfig }
  );
};

const returnFosteredPet = async (userId, petId, headersConfig) => {
  await axios.delete(`${URLrequests}/pets/foster/${userId}/${petId}`, {
    headers: headersConfig,
  });
};

const checkPetStatus = async (
  userId,
  petId,
  headersConfig,
  setPetSaved,
  setPetFostered,
  setPetAdopted
) => {
  await axios
    .get(`${URLrequests}/pets/checkstatus/${userId}/${petId}`, {
      headers: headersConfig,
    })
    .then((res) => {
      if (res.data.adoptedPet[0]) {
        setPetAdopted("Return");
      }
      if (res.data.fosteredPet[0]) {
        setPetFostered("Return");
      }
      if (res.data.savedPet[0]) {
        setPetSaved("Unsave ❤");
      }
    });
};

const getSavedPetsByUserId = async (userId, headersConfig) => {
  let savedPets = [];
  let requests = [];
  await axios
    .get(`${URLrequests}/pets/saved/user/${userId}`, {
      headers: headersConfig,
    })
    .then((petsIds) => {
      petsIds.data.forEach((pet) => {
        requests.push(getPet(pet.petId));
      });
    });
  return new Promise((resolve) => {
    Promise.all(requests)
      .then((promises) => promises.forEach((p) => savedPets.push(p.data[0])))
      .then(() => resolve(savedPets));
  });
};

const getOwnedPetsByUserId = async (userId, headersConfig) => {
  let ownedPets = [];
  let requests = [];
  await axios
    .get(`${URLrequests}/pets/owned/user/${userId}`, {
      headers: headersConfig,
    })
    .then((petsIds) => {
      petsIds.data.forEach((pet) => {
        let ownedPet = getPet(pet.petId);
        requests.push(ownedPet);
      });
    });
  return new Promise((resolve) => {
    Promise.all(requests)
      .then((promises) => promises.forEach((p) => ownedPets.push(p.data[0])))
      .then(() => resolve(ownedPets));
  });
};

export {
  getPet,
  editPet,
  getAllUsers,
  getAllPets,
  getUserById,
  getUserByToken,
  addPet,
  signupUser,
  loginUser,
  editUser,
  savePet,
  unsavePet,
  fosterPet,
  returnFosteredPet,
  adoptPet,
  returnAdoptedPet,
  checkPetStatus,
  getSavedPetsByUserId,
  getOwnedPetsByUserId,
  searchPets,
};
