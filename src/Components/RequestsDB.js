import axios from "axios";

const getAllPets = async (setAllPets) => {
  try {
    const res = await axios.get("http://localhost:3006/pets").then((res) => {
      setAllPets(res.data);
    });
  } catch (err) {
    console.log(err);
  }
};

const getPet = async (petId, setPet) => {
  try {
    const res = await axios
      .get(`http://localhost:3006/pets/${petId}`)
      .then((res) => {
        setPet(res.data[0]);
      });
  } catch (err) {
    console.log(err);
  }
};

const editPet = async (petId, newObject, setPet, headersConfig) => {
  try {
    const res = await axios
      .put(`http://localhost:3006/pets/edit/${petId}`, newObject, {headers: headersConfig})
      .then(() => {
        getPet(petId, setPet);
      });
  } catch (err) {
    console.log(err);
  }
};

const addPet = async (newPet, setAllPets, headersConfig) => {
  try {
    const res = await axios
      .post("http://localhost:3006/pets/add", newPet, {headers: headersConfig})
      .then(() => {
        getAllPets(setAllPets);
      });
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (setAllUsers, headersConfig) => {
  try {
    const res = await axios
      .get("http://localhost:3006/users/", { headers: headersConfig })
      .then((res) => {
        setAllUsers(res.data);
      });
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (userId, headersConfig, setUser) => {
  try {
    const res = await axios
      .get(`http://localhost:3006/users/${userId}`, {headers: headersConfig})
      .then((res) => {
        setUser(res.data[0]);
      });
  } catch (err) {
    console.log(err);
  }
};

const getUserByToken = async (headersConfig, setUser) => {
  try {
    const res = await axios
      .get("http://localhost:3006/users/currentuser", {
        headers: headersConfig,
      })
      .then((res) => {
        setUser(res.data[0]);
      });
  } catch (err) {
    console.log(err);
    setUser(false)
  }
};

const signupUser = async (newUser) => {
  try {
    const res = await axios.post("http://localhost:3006/users/signup", newUser);
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (user, setUser) => {
  try {
    const res = await axios.post("http://localhost:3006/users/login", user);
    if (res.data.token) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      setUser(res.data.user);
    }
  } catch (err) {
    console.log(err);
  }
};

const editUser = async (userId, newObject, setUser, headersConfig) => {
  try {
    const res = await axios
      .put(`http://localhost:3006/users/edit/${userId}`, newObject, {headers: headersConfig})
      .then(() => {
        getUserByToken(headersConfig, setUser);
      });
  } catch (err) {
    console.log(err);
  }
};

const savePet = async (userId, petId, headersConfig) => {
  try {
    const res = await axios
      // .put(`http://localhost:3006/users/edit/${userId}`, newObject, {headers: headersConfig})
      .then(() => {
        // getUserByToken(headersConfig, setUser);
      });
  } catch (err) {
    console.log(err);
  }
};

const fosterPet = async (userId, petId, headersConfig) => {
  try {
    const res = await axios
      // .put(`http://localhost:3006/users/edit/${userId}`, newObject, {headers: headersConfig})
      .then(() => {
        // getUserByToken(headersConfig, setUser);
      });
  } catch (err) {
    console.log(err);
  }
};

const adoptPet = async (userId, petId, headersConfig) => {
  try {
    const res = await axios
      // .put(`http://localhost:3006/users/edit/${userId}`, newObject, {headers: headersConfig})
      .then(() => {
        // getUserByToken(headersConfig, setUser);
      });
  } catch (err) {
    console.log(err);
  }
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
  fosterPet,
  adoptPet,
};
